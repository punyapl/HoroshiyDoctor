import './styles/index.scss'
import { Suspense, } from 'react'
import { RouterProvider, } from 'react-router-dom'
import { router, } from '@/app/providers/router/config/routeConfig'
import { PageLoader, } from '@/widgets/PageLoader'
import { AccessibilityPanel, AccessibilityProvider, } from '@/features/accessibility';

const App = () => {
    return (
        <AccessibilityProvider>
            <AccessibilityPanel />
            <div className="app">
                <Suspense fallback={<PageLoader />}>
                    <RouterProvider router={router} />
                </Suspense>
            </div>
        </AccessibilityProvider>
    )
}
export default App
