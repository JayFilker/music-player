import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

function LanguageSwitcher() {
    const { i18n } = useTranslation()
    const [language, setLanguage] = useState<string>(i18n.language || 'en')

    // 当语言状态改变时，更新 i18n 实例的语言
    useEffect(() => {
        i18n.changeLanguage(language)
    }, [language, i18n])

    return (
        <select
            value={language}
            onChange={(e) => {
                setLanguage(e.target.value)
            }}
            className="p-2 border rounded"
        >
            <option value="en">🇬🇧 English</option>
            <option value="tr">🇹🇷 Türkçe</option>
            <option value="zh-CN">🇨🇳 简体中文</option>
            <option value="zh-TW">繁體中文</option>
        </select>
    )
}

export default LanguageSwitcher
