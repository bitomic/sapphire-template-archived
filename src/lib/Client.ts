import { container, SapphireClient } from '@sapphire/framework'
import { env } from './environment'
import { Intents } from 'discord.js'
import type { Sequelize } from 'sequelize'
import { sequelize } from './Sequelize'

export class UserClient extends SapphireClient {
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
