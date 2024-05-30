import NavDropdown from 'react-bootstrap/NavDropdown';
import viIcon from '../../assets/vietnam.png'
import enIcon from '../../assets/united-kingdom.png'
import { useTranslation, Trans } from 'react-i18next';



const Language = () => {

    const { t, i18n } = useTranslation();

    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language);
        console.log(i18n.language);
    }

    return (
        <>

            {i18n.language === "en" ?
                <NavDropdown
                    title=
                    {
                        <>
                            {<img src={enIcon} />}
                            English
                        </>
                    }
                    className='language'
                    id="basic-nav-dropdown2">
                    <NavDropdown.Item
                        onClick={() => handleChangeLanguage("vi")}
                    >
                        <img src={viIcon} />
                        Việt Nam
                    </NavDropdown.Item>
                </NavDropdown>
                :
                <NavDropdown
                    title=
                    {
                        <>
                            {<img src={viIcon} />}
                            Việt Nam
                        </>
                    }
                    className='language'
                    id="basic-nav-dropdown2">
                    <NavDropdown.Item
                        onClick={() => handleChangeLanguage("en")}
                    >
                        <img src={enIcon} />
                        English
                    </NavDropdown.Item>
                </NavDropdown>

            }

        </>
    )
}

export default Language;