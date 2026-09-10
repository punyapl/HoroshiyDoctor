import { Loader, } from '@/shared/ui/Loader'
import cls from './PageLoader.module.scss'

const PageLoader = () => {
    return (
        <div className={cls.pageLoader}>
            <Loader />
        </div>
    )
}

export default PageLoader
