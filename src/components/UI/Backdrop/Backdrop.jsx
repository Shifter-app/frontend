import style from './Backdrop.module.scss'
import {AnimatePresence, motion} from "framer-motion"

/**
 *
 * @param props {BackdropProps}
 * @returns {JSX.Element}
 * @constructor
 */
const Backdrop = (props) => {
    const {active, className, animationTime, ...restProps} = props
    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    {...restProps}
                    initial={{
                        opacity: 0,
                    }}
                    transition={{
                        duration: animationTime,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    exit={{
                        opacity: 0,
                    }}
                    style={{
                        zIndex: 800,
                    }}
                    className={`absolute h-full w-full ${className} ${style.backdrop}`}/>
            )}
        </AnimatePresence>
    )
}

Backdrop.defaultProps = {
    animationTime: 0.4
}

export default Backdrop