import { ButtonIcon } from '../../ButtonIcon'
import { SvgIcon } from '../../SvgIcon'

export function MiddleControlButtons(props: any) {
    const { Logo } = props
    return (
        <div className="middle-control-buttons">
            <div className="blank"></div>
            <div className="container">
                {
                    Logo.map((item: any, index: any) => {
                        return (
                            <ButtonIcon
                                classname={(index === 2 || index === 3) ? 'play' : ''}
                                key={index}
                                title={item.title}
                                onClick={item.meth}
                                sty={item.style}
                            >
                                <SvgIcon>
                                    {item.icon}
                                </SvgIcon>
                            </ButtonIcon>
                        )
                    })
                }
            </div>
            <div className="blank"></div>
        </div>
    )
}
