import { container, SapphireClient } from '@sapphire/framework'
import { ChatInputCommandsData } from '../framework'
import { env } from './environment'
import { Intents } from 'discord.js'
import type { Sequelize } from 'sequelize'
import { sequelize } from './Sequelize'

export class UserClient extends SapphireClient {
	public override readonly chatInputCommandsData: ChatInputCommandsData

	public constructor() {
		super( {
			defaultPrefix: env.DISCORD_PREFIX,
			intents: [
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_MESSAGES
			],
			loadDefaultErrorListeners: true
		} )
		container.sequelize = sequelize
		this.chatInputCommandsData = new ChatInputCommandsData()
	}

	public async start(): Promise<void> {
		await this.login( env.DISCORD_TOKEN )
	}
}

declare module '@sapphire/pieces' {
	interface Container {
		sequelize: Sequelize
	}
}

declare module 'discord.js' {
	interface Client {
		chatInputCommandsData: UserClient[ 'chatInputCommandsData' ]
	}
}
