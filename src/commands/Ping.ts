import type { ApplicationCommandRegistry, CommandOptions } from '@sapphire/framework'
import type { CommandInteraction, Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import { Command } from '@sapphire/framework'

@ApplyOptions<CommandOptions>( {
	description: 'Pooong!',
	enabled: true,
	name: 'test355'
} )
export class UserCommand extends Command {
	public override registerApplicationCommands( registry: ApplicationCommandRegistry ): void {
		registry.registerChatInputCommand(
			{
				description: this.description,
				name: this.name
			},
			this.container.client.chatInputCommandsData.get( this.name )
		)
	}

	public override messageRun( message: Message ): void {
		void message.reply( 'Pong!' )
	}

	public override chatInputRun( interaction: CommandInteraction ): void {
		void interaction.reply( 'Pong!' )
	}
}
