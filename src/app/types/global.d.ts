declare module '*.scss' {
    type IClassNames = Record<string, string>

    const classNames: IClassNames
    export = classNames
}
declare module '*.css'

declare module '*.svg' {
    import { type ReactElement, type SVGProps, } from 'react'

    const content: (props: SVGProps<SVGElement>) => ReactElement
    export default content
}

declare module '*.png';
declare module '*.jpeg';
declare module '*.jpg';
declare module '*.gif';

declare module '*.pdf';

// declared api url const
declare const __API__: string
// declared is development flag
declare const __IS_DEV__: boolean
declare const __TOKEN__: string
declare const __YMAPKEY__: string
// declare const __PROJECT__: 'storybook' | 'jest' | 'main';
