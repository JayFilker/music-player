import './index.less'
import {ButtonIcon} from '../ButtonIcon'
import {SvgIcon} from '../SvgIcon'
import { Link } from 'react-router-dom'
import 'vscode-codicons/dist/codicon.css';
import { useState } from 'react'
import {TopSpace} from '../TopSpace'

export function TopList(){
    const [act, setAct] = useState(false);
    const [check,setCheck] =useState([true,false,false]);
    return <div>
        <nav  className='has-custom-titlebar' >
<TopSpace/>
        <div className="navigation-buttons">
            <ButtonIcon>
                <SvgIcon><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="svg-inline--fa fa-angle-left fa-w-8" role="img" viewBox="0 0 256 512" id="icon-arrow-left"><path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg></SvgIcon>
            </ButtonIcon>
            <ButtonIcon>
                <SvgIcon>
                    <svg
                        xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                        className="svg-inline--fa fa-angle-right fa-w-8" role="img" viewBox="0 0 256 512"
                        id="icon-arrow-right"
                    >
                        <path
                            fill="currentColor"
                            d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"
                        ></path>
                    </svg>
                </SvgIcon>
            </ButtonIcon>
        </div>
            <div className="navigation-links">
                <Link to="/firstpage"
                    style={{
                        color: check[0]?'#335eea':'',
                    }}
                    onClick={() => {
                        setCheck(check.map((_item, index) => index === 0))
                    }}
                >
                        首页
                </Link>
                <Link to="/firstpage"
                    style={{
                        color: check[1]?'#335eea':'',
                    }}
                    onClick={() => {
                        setCheck(check.map((_item, index) => index === 1))
                    }}
                >
                        发现
                </Link>
                <Link to="/firstpage"
                    style={{
                        color: check[2]?'#335eea':'',
                    }}
                    onClick={() => {
                        setCheck(check.map((_item, index) => index === 2))
                    }}
                >
                        音乐库
                </Link>
</div>
    <div className="right-part">
        <div className="search-box">
            <div className={`container ${act?'active':''}`}
            >
                <SvgIcon >
                    <svg
                        xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                        className="svg-inline--fa fa-search fa-w-16" role="img" viewBox="0 0 512 512" id="icon-search"
                    >
                        <path
                            fill="currentColor"
                            d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                        ></path>
                    </svg>
                </SvgIcon>
                <div className="input"
                    style={{display:'flex',alignItems:'center'}}
                >
                    <input
                        // ref="searchInput"
                        v-model="keywords"
                        type="search"
                        placeholder={act?'':'搜索'}
                        onFocus={() => setAct(true)}
                        onBlur={() => setAct(false)}
                    />
                </div>
            </div>
        </div>
        <img
            src='http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=60y60'
            className="avatar"
            loading="lazy"
         alt=''/>
    </div>
        </nav>
        
        {/*<ContextMenu ref="userProfileMenu">*/}
        {/*    <div className="item" >*/}
        {/*<svg-icon icon-class="settings" />*/}
        {/*{{ $t('library.userProfileMenu.settings') }}*/}
    {/*</div>*/}
    {/*<div  className="item" >*/}
        {/*<svg-icon icon-class="login" />*/}
        {/*{{ $t('login.login') }}*/}
{/*</div>*/}
{/*    <div  className="item" >*/}
        {/*<svg-icon icon-class="logout" />*/}
        {/*{{ $t('library.userProfileMenu.logout') }}*/}
{/*</div>*/}
{/*    <hr />*/}
{/*    <div className="item" >*/}
        {/*<svg-icon icon-class="github" />*/}
        {/*{{ $t('nav.github') }}*/}
{/*</div>*/}
{/*// </ContextMenu>*/}
</div>

}
