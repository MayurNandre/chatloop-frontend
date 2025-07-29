import { Grid, Skeleton, Stack } from '@mui/material'
import React from 'react'
import { BouncingSkeleton } from '../styles/StyledComponent'

const LayoutLoader = () => {
    return (
        <Grid container height={"calc(100dvh - 4rem)"} spacing={"1rem"}>
            <Grid item sm={4} md={4} height={"100%"}
                sx={{
                    display: { xs: "none", sm: "block" },
                }}>
                <Skeleton variant='rounded' height={"100dvh"} />
            </Grid>

            <Grid item sm={8} md={5} xs={12} height={"100%"}>
                <Stack spacing={"1rem"}>
                    {
                        Array.from({ length: 10 }).map((_, index) => (
                            <Skeleton key={index} variant='rounded' height={"5rem"} />
                        ))
                    }
                </Stack>
            </Grid>

            <Grid item md={3} lg={3} height={"100%"}
                sx={{
                    display: { xs: "none", md: "block" },
                }}>
                <Skeleton variant='rounded' height={"100dvh"} />
            </Grid>
        </Grid>
    )
}

const w = 13;
const h = 13;

const TypingLoader = () => {
    return (
        <Stack
            spacing={"0.4rem"}
            direction={"row"}
            padding={"0.5rem"}
            justifyContent={"center"}
        >
            <BouncingSkeleton
                variant='circular'
                width={w}
                height={h}
                style={{
                    animationDelay: "0.1s"
                }}
            />
            <BouncingSkeleton
                variant='circular'
                width={w}
                height={h}
                style={{
                    animationDelay: "0.2s"
                }}
            />
            <BouncingSkeleton
                variant='circular'
                width={w}
                height={h}
                style={{
                    animationDelay: "0.4s"
                }}
            />
        </Stack>)
}

export { LayoutLoader, TypingLoader }
