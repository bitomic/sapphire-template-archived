import { container, RegisterBehavior, SapphireClient } from '@sapphire/framework'
import { env } from './environment'
import { Intents } from 'discord.js'
import type { Sequelize } from 'sequelize'
import { sequelize } from './Sequelize'

export class UserClient extends SapphireClient {
	public override readonly chatInputCommandSettings = {
		behaviorWhenNotIdentical: RegisterBehavior.LogToConsole,
		guildIds: env.NODE_ENV === 'development' ? [ '883916646593490944' ] : [],
		register: true
	} as const

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
		chatInputCommandSettings: UserClient[ 'chatInputCommandSettings' ]
	}
}
