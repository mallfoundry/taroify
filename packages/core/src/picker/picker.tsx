import { View } from "@tarojs/components"
import classNames from "classnames"
import * as React from "react"
import { ReactNode } from "react"
import { prefixClassname } from "../styles"
import { HAIRLINE_BORDER_UNSET_TOP_BOTTOM } from "../styles/hairline"
import PickerColumn from "./picker-column"
import PickerOption from "./picker-option"

interface PickerProps {
  className?: string
  children?: ReactNode
}

export default function Picker(props: PickerProps) {
  const { className, children } = props

  return (
    <View className={classNames(prefixClassname("picker"), className)}>
      <View className={prefixClassname("picker__columns")} style={{ height: "264px" }}>
        <PickerColumn>
          <PickerOption>1</PickerOption>
          <PickerOption>2</PickerOption>
          <PickerOption>3</PickerOption>
          <PickerOption>4</PickerOption>
          <PickerOption>5</PickerOption>
          <PickerOption>6</PickerOption>
          <PickerOption>7</PickerOption>
          <PickerOption>8</PickerOption>
          <PickerOption>9</PickerOption>
          <PickerOption>10</PickerOption>
          <PickerOption>11</PickerOption>
          <PickerOption>12</PickerOption>
          <PickerOption>13</PickerOption>
          <PickerOption>14</PickerOption>
          <PickerOption>15</PickerOption>
          <PickerOption>16</PickerOption>
          <PickerOption>17</PickerOption>
          <PickerOption>18</PickerOption>
          <PickerOption>19</PickerOption>
          <PickerOption>20</PickerOption>
          <PickerOption>21</PickerOption>
        </PickerColumn>
        {/*<PickerColumn>
          <PickerOption>1</PickerOption>
          <PickerOption>2</PickerOption>
          <PickerOption>3</PickerOption>
          <PickerOption>4</PickerOption>
          <PickerOption>5</PickerOption>
          <PickerOption>6</PickerOption>
          <PickerOption>7</PickerOption>
          <PickerOption>8</PickerOption>
          <PickerOption>9</PickerOption>
          <PickerOption>10</PickerOption>
          <PickerOption>11</PickerOption>
          <PickerOption>12</PickerOption>
          <PickerOption>13</PickerOption>
          <PickerOption>14</PickerOption>
          <PickerOption>15</PickerOption>
          <PickerOption>16</PickerOption>
          <PickerOption>17</PickerOption>
          <PickerOption>18</PickerOption>
          <PickerOption>19</PickerOption>
          <PickerOption>20</PickerOption>
          <PickerOption>21</PickerOption>
        </PickerColumn>*/}
        <View
          className={prefixClassname("picker__mask")}
          style={{
            backgroundSize: "100% 110px",
          }}
        />
        <View
          className={classNames([
            HAIRLINE_BORDER_UNSET_TOP_BOTTOM,
            prefixClassname("picker__frame"),
          ])}
          style={{ height: "44px" }}
        />
      </View>
    </View>
  )
}
