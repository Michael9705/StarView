import React, { Component } from "react";
import { List, Avatar, Button, Checkbox, Spin } from "antd";
import satellite from "../assets/images/satellite.svg";

class SatelliteList extends Component {
  // state = {
  //     selected: []
  // }

  onChange = (e) => {
    const { dataInfo, checked } = e.target; //被勾上的卫星的target里面有条checked = true, 被取消的里面checked= false, 卫星的json.target.checked
    const { selected } = this.props; // old list
    const list = this.addOrRemove(dataInfo, checked, selected); // modified list
    this.props.updateSelected(list);
  };

  addOrRemove = (item, status, list) => {
    //entry不是关键字，是参数可以替换
    const found = list.some((entry) => entry.satid === item.satid); //如果有一个element通过测试（=item.satid)返回true
    if (status && !found) {
      //如果客户勾了它, 并且原list里没有它
      list = [...list, item];
    }

    if (!status && found) {
      //如果客户取消了它，并且原list里已经找到它
      list = list.filter((entry) => {
        return entry.satid !== item.satid; //把满足条件（和item.id不一样）的留下
      });
    }
    return list;
  };

  render() {
    const satList = this.props.satInfo ? this.props.satInfo.above : [];
    const { isLoad } = this.props;

    return (
      <div className="sat-list-box">
        {isLoad ? (
          <div className="spin-box">
            <Spin tip="Loading..." size="large" />
          </div>
        ) : (
          <List
            className="sat-list"
            itemLayout="horizontal"
            size="small"
            dataSource={satList}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Checkbox dataInfo={item} onChange={this.onChange} />,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar size={50} src={satellite} />}
                  title={<p>{item.satname}</p>}
                  description={`Launch Date: ${item.launchDate}`}
                />
              </List.Item>
            )}
          />
        )}
      </div>
    );
  }
}

export default SatelliteList;
