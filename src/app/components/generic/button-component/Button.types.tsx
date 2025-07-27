import React from "react"

export interface ButtonType {
    variant: string
    title: string
    isLoading?: boolean
    icon? : React.ReactNode
    size? : string
}