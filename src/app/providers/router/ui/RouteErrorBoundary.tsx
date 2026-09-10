import { useRouteError, } from 'react-router'
import { isRouteErrorResponse, } from 'react-router-dom'
// import { ErrorPage, } from '@/pages/ErrorPage'
// import { NotFoundPage, } from '@/pages/NotFoundPage'

export const RouteErrorBoundary = () => {
    const error = useRouteError()

    if (isRouteErrorResponse(error)) {
        console.error(error)
        if (error.status === 404) {
            return null
            // return <NotFoundPage />
        }

        return null
        // return <ErrorPage />
    } else {
        return <div>Oops</div>
    }
}
