import '../database'
import { ApplyOptions } from '@sapphire/decorators'
import { env } from '../lib'
import { Listener } from '@sapphire/framework'
import type { ListenerOptions } from '@sapphire/framework'
import path from 'path'
import { TaskStore } from '../framework'

@ApplyOptions<ListenerOptions>( {
	event: 'ready',
	once: true
} )
export class UserEvent extends Listener {
	public async run(): Promise<void> {
		this.container.logger.info( 'Ready!' )

		await this.container.sequelize.sync()
		await this.loadTasks()
		await this.loadChatInputCommandsData()
	}

	public async loadTasks(): Promise<void> {
		const taskStore = new TaskStore().registerPath( path.resolve( __dirname, '../tasks' ) )
		taskStore.container.client = this.container.client
		this.container.client.stores.register( taskStore )
		await taskStore.loadAll()
	}

	public async loadChatInputCommandsData(): Promise<void> {
		const loadedCommands = env.NODE_ENV === 'development'
			? await ( await this.container.client.guilds.fetch( env.DISCORD_DEVELOPMENT_SERVER ) ).commands.fetch()
			: await this.container.client.application?.commands.fetch()
		if ( !loadedCommands ) return
		const registries = this.container.applicationCommandRegistries
		for ( const [
			_, command
		] of loadedCommands ) {
			const registry = registries.acquire( command.name )
			if ( registry.chatInputCommands.size === 0 ) continue
			this.container.client.chatInputCommandsData.addIdHint( command.name, command.id )
		}
		this.container.client.chatInputCommandsData.save()
	}
}
