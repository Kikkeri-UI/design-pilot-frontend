export interface TileProps {
    title: string,
    description: string,
    onClick: () => void,
    buttonTitle?: string,
    isComingSoon? : boolean
}