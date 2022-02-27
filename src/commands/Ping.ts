import type { CommandInteraction, Message } from 'discord.js'
import type { CommandOptions } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'
import { Command } from '@sapphire/framework'

@ApplyOptions<CommandOptions>( {
	chatInputApplicationOptions: {
		description: 'Pong!',
		name: 'ping'
	},
	enabled: true,
	name: 'ping'
} )
export class UserCommand extends Command {
	public override chatInputApplicationRun( interaction: CommandInteraction ): void {
		void interaction.reply( 'Pong!' )
	}

	public override messageRun( message: Message ): void {
		void message.reply( 'Pong!' )
	}
}
