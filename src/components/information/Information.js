import React from 'react';
import DisplayExample from './DisplayExample'

class Information extends React.Component{

    //card examples
    //fish sizes
    //tips
    
    render(){
        return(
            <div>
                <h2 className="sc-h2">About</h2>
                <div id="sc-left-input">
                    <div>
                        <h3>
                            Fish Sizes
                        </h3>
                        <p>{`Images from the `}
                            <a href="https://game8.co/games/Animal-Crossing-New-Horizons/archives/281313">
                            Animal Crossing: New Horizons Walkthrough Team</a>
                            </p>
                        <div id="sc-fish-shadow-list">
                            <div>
                                <img alt="size 1 shadow" style={{transform: 'rotate(180deg', borderRadius: '15px'}}
                                    src="https://gamewith-en.akamaized.net/article_tools/animal-crossing-new-horizons/gacha/shadow_1.png"
                                    />
                                <p>1</p>
                            </div>
                            <div>
                                <img alt="size 2 shadow"
                                    src="https://img.game8.co/3246524/a0a6f3d2362292bcac80e020af812d25.png/show"/>
                                <p>2</p>
                            </div>
                            <div>
                                <img alt="size 3 shadow"
                                    src="https://img.game8.co/3246526/4c7b854f59e79e7a5e044816e6237a23.png/show"/>
                                <p>3</p>
                            </div>
                            <div>
                                <img alt="size 4 shadow"
                                    src="https://img.game8.co/3246525/41492a56fa890ce20164386b1f8f0aef.png/show"/>
                                <p>4</p>
                            </div>
                            <div>
                                <img alt="size 5 shadow"
                                    src="https://img.game8.co/3246521/c27213466fc9cac4ea36a23b95be1ad7.png/show"/>
                                <p>5</p>
                            </div>
                            <div>
                                <img alt="size 6 shadow"
                                    src="https://img.game8.co/3246522/7a049e7671dcf7ecf589edbfcec2ff14.png/show"/>
                                <p>6</p>
                                </div>
                            <div>
                                <img alt="long and thin shadow"
                                    src="https://img.game8.co/3246523/d5c2eb206fd07a434cccdd98081a07c2.png/show"/>
                                <p>Long and Thin</p>
                                </div>
                            <div>
                                <img alt="fin shadow"
                                    src="https://img.game8.co/3246520/9e65703c1c534d03c5c4ac718d61dbe8.png/show"/>
                                <p>6 (Fin)</p>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div>
                        <h3>
                            Hemisphere Check
                        </h3>
                        <p>
                            You may have noticed a request for your locastion when using this app. The app
                            is built to work without this check, and only checks approximate lattitude imformation
                            with this request through the window.navigator api. It is not necessary to use the approximate
                        </p>
                        <p>
                            If you deny the request you will just have to click for your hemisphere manually at first
                        </p>
                    </div>
                    <br></br>
                    <div>
                        <h3>
                            Automatic Month Load by Computer Date
                        </h3>
                        <p>
                            Another automated feature is the intial month being set to the current month provided by your computer's time. This is to ensure quick use of the app if you are playing in real time
                        </p>
                    </div>
                </div>
                <div id="sc-right-input">
                    <div>
                        <h2 id="sc-option-text" className="sc-h2">Card Layout</h2>
                        <div id="sc-ex-grid">
                            <DisplayExample type ="fish"/>
                            <DisplayExample type ="bug"/> 
                        </div> 
                        <br></br>
                        <div id="bottom-bottom"></div>
                        <div id="bottom-bottom"></div>
                    </div>
                </div>
                <div id="bottom-bottom"></div>
            </div>
        )
    }
}

export default Information;