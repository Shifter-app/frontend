import cssStyle from './Select.module.css'
import Select, {components, defaultTheme} from "react-select"
import produce from "immer";
import {Typography} from "../index.jsx";
import {AnimatePresence, motion} from "framer-motion";
import {fadeInOutAndDownToTop} from "../Utils/utils.js";


/**
 *
 * @param props {import("react-select").DropdownIndicatorProps<any> & {
 * dropdownIcon: ReactNode;
 * dropdownIconSize: CSSProperties['fontSize'];
 * dropdownIconColor: `#${string}`;
 * }}
 * @returns {JSX.Element}
 * @constructor
 */
const DropdownIndicator = (props) => {

    return (
        <components.DropdownIndicator
            className={`${cssStyle.dropdownIndicator} ${props.isFocused ? cssStyle.dropdownIndicatorFocused : ''}`}
            {...props}>
            <IconIonChevronDown/>
        </components.DropdownIndicator>
    )
}

/**
 *
 * @param props {import("react-select").OptionProps}
 * @returns {JSX.Element}
 * @constructor
 */
const Option = (props) => {
    return (
        <components.Option
            className={`${cssStyle.selectOption}`}
            {...props}>
            {props.children}
        </components.Option>
    )
}

/**
 *
 * @param props {import("react-select").SingleValueProps<any> & {
 * singleValueVariant: TypographyVariantOptions;
 * singleValueColor: CSSProperties[color];
 * singleValueWeight: CSSProperties['fontWeight'];
 * singleValueSize: CSSProperties['fontSize'];
 * singleValueFontFamily: CSSProperties['fontFamily'];
 * singleValueSpacing: CSSProperties['letterSpacing'];
 * }}
 * @returns {JSX.Element}
 * @constructor
 */
const SingleValue = (props) => {
    const {
              children, singleValueVariant, singleValueSize,
              singleValueColor, singleValueFontFamily, singleValueSpacing,
              singleValueWeight, ...restProps
          } = props


    return (
        <components.SingleValue {...restProps}>
            <Typography
                variant={singleValueVariant}
                fontWeight={singleValueWeight}
                size={singleValueSize}
                fontFamily={singleValueFontFamily}
                spacing={singleValueSpacing}
                color={singleValueColor}>
                {children}
            </Typography>
        </components.SingleValue>
    )
}

/**
 *
 * @param props {import("react-select").ControlProps<any> & {isSelectable: boolean, noBorder: boolean}}
 * @returns {JSX.Element}
 * @constructor
 */
const Control = (props) => {
    const {children, className, ...restProps} = props

    return (
        <components.Control
            {...restProps}
            className={`h-full ${cssStyle.selectControl} ${className}`}>

            {children}
        </components.Control>
    )
}

/**
 *
 * @param props {import("react-select").MenuProps<any> & {width: number, anchorPoint: 'right' | 'left'}}
 * @returns {JSX.Element}
 * @constructor
 */
const Menu = (props) => {
    const {children, className, ...restProps} = props


    return (
        <components.Menu
            className={`${className || ''} ${cssStyle.selectMenu}`}
            {...restProps}>
            {children}
        </components.Menu>
    )
}


/**
 *
 * @param props {import("react-select").MenuListProps<any>}
 * @returns {JSX.Element}
 * @constructor
 */
const MenuList = (props) => {
    const {children, className, ...restProps} = props

    return (
        <components.MenuList
            className={`${cssStyle.selectMenuList} ${className}`}
            {...restProps}>
            {children}
        </components.MenuList>
    )
}


/**
 * @param props {import("../UI").SelectProps}
 * @returns {JSX.Element}
 * @constructor
 */
const AppSelect = (props) => {
    const {
              components, width, height, menuWidth, menuAnchorPoint, className,
              singleValueVariant, singleValueColor, singleValueWeight,
              singleValueFontFamily, singleValueSize, singleValueSpacing,
              isSelectable, dropdownIconColor, dropdownIconSize, noBorder, label,
              ...restProps
          } = props

    const customStyles = {
        singleValue: (provided, state) => ({
            ...provided,
            borderRadius: 5,
            primary:      isSelectable ? '#53326C' : '#515151',
        }),

        control: (provided, state) => {
            return {
                ...provided,
                borderStyle: noBorder ? 'none' : 'solid',
                boxShadow:   noBorder ? 'none' : '',
                borderColor: '#515151',
            }
        },

        dropdownIndicator: (provided, state) => ({
            ...provided,
            color:    dropdownIconColor,
            fontSize: dropdownIconSize,
        }),

        menu: (provided, state) => ({
            ...provided,
            width: menuWidth,
            ...(menuAnchorPoint === 'right') ? {right: 0} : {left: 0},
        })
    }

    return (
        <section
            style={{width, height}}
            className={`flex-col relative h-full ${className}`}>
            {label && (
                <AnimatePresence>
                    {props.value?.label && (
                        <motion.label
                            {...fadeInOutAndDownToTop}
                            style={{top: -9, left: 12, backgroundColor: '#fff', zIndex: 1}}
                            className="w-fit absolute px-4">
                            <Typography
                                size={13}
                                fontWeight={400}
                                variant={'button1'}>
                                {label}
                            </Typography>
                        </motion.label>
                    )}
                </AnimatePresence>
            )}
            <Select
                {...restProps}
                className="h-full"
                theme={produce(defaultTheme, (draft) => {
                    draft.colors.primary   = '#53326C'
                    draft.colors.primary50 = '#d5c9e7'
                    draft.colors.primary25 = '#BAADC4'
                })}
                blurInputOnSelect={true}
                options={props.options}
                styles={customStyles}
                components={{
                    IndicatorSeparator: () => null,
                    DropdownIndicator,
                    Control,
                    Option,
                    SingleValue:        (props) => SingleValue({
                        ...props, singleValueVariant, singleValueWeight, singleValueColor, singleValueFontFamily,
                        singleValueSpacing, singleValueSize
                    }),
                    Menu,
                    MenuList,
                    ...components
                }}/>
        </section>
    )
}

AppSelect.defaultProps = {
    className:          '',
    singleValueVariant: 'button1',
    singleValueColor:   '#515151',
    dropdownIconColor:  '#515151',
    dropdownIconSize:   16,
    noBorder:           false,
    isSelectable:       true,
    height:             '100%',
    menuWidth:          '100%',
    menuAnchorPoint:    'left',
}

export default AppSelect
