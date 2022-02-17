import { ApplicationCommandRegistry, RegisterBehavior } from '@sapphire/framework'
import { env } from '../../lib'
import fs from 'fs-extra'
import path from 'path'

export class ChatInputCommandsData {
	public readonly chatInputCommandsRegisterOptions: Record<string, Pick<ApplicationCommandRegistry.RegisterOptions, 'guildIds' | 'idHints'>> = {}
    
	public readonly chatInputCommandDefaultOptions = {
		behaviorWhenNotIdentical: RegisterBehavior.LogToConsole,
		guildIds: env.NODE_ENV === 'development' ? [ '883916646593490944' ] : [],
		register: true
	} as const

    public readonly filepath: string

    public constructor( filepath?: string ) {
        this.filepath = filepath ?? path.resolve( __dirname, '../../../slash-settings.json' )

		if ( fs.existsSync( this.filepath ) ) {
			try {
				this.chatInputCommandsRegisterOptions = fs.readJsonSync( this.filepath ) as typeof this[ 'chatInputCommandsRegisterOptions' ]
			} catch {
			}
		}
    }

	public get( name: string ): ApplicationCommandRegistry.RegisterOptions {
		const options = this.chatInputCommandsRegisterOptions[ name ]
		return {
			...this.chatInputCommandDefaultOptions,
			...( options ?? {} )
		}
	}
}