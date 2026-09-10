import { memo, Suspense, } from 'react'
import { Route, Routes, } from 'react-router-dom'
import { PageLoader, } from '@/widgets/PageLoader'
import { routeConfig, } from '../config/routeConfig'

export const AppRouter = () => {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {Object.values(routeConfig).map(route => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                    />
                ))}
            </Routes>
        </Suspense>
    )
}

export default memo(AppRouter)
