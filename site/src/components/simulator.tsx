import * as React from "react";
import "./simulator.scss"
import useScroll from "../hooks/useScroll";
import classNames from "classnames";

export default function Simulator() {
    const {position: {y: positionY}} = useScroll()
    return (
        <div className={classNames("vant-simulator", {
            [`vant-simulator-fixed`]: positionY > 60
        })}>
            <iframe src="//vant-contrib.gitee.io/vant/mobile.html#/zh-CN/" frameBorder="0"/>
        </div>
    )
}
