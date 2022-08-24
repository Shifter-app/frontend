import cssStyle from './Icon.module.css';


/**
 *
 * @param props {IconProps}
 * @returns {JSX.Element}
 * @constructor
 */
const Icon = (props) => {
    const {children, size, style, height, width, color, className, ...restProps} = props;

    return (
        <div
            {...restProps}
            className={`${cssStyle.icon} ${className}`}
            style={{
                height,
                width,
                fontSize: size,
                color,
                ...style,
            }}>
            {children}
        </div>
    )
}

Icon.defaultProps = {
    className: '',
    size:      '1.5rem',
    height:    'auto',
    width:     'auto',
}

export default Icon
