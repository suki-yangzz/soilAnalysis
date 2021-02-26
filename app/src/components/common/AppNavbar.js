import React, {Component} from 'react';
import {Button, Nav, Navbar, NavbarBrand, NavItem, Dropdown} from 'react-bootstrap';

export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdown: false
        };
        this.dropdownToggle = this.dropdownToggle.bind(this);
    }

    dropdownToggle() {
        this.setState({
            dropdown: !this.state.dropdown
        });
    }

    render() {
        const message = this.props.user ?
            <span>Welcome, {this.props.user.name}! </span> :
            <span>Please log in first.</span>;

        const button = this.props.isAuthenticated ?
            <div>
                <Button color="link" onClick={this.logout}>Logout</Button>
            </div> :
            <Button color="primary" onClick={this.login}>Login</Button>;

        return <Navbar bg="dark" variant="dark" expand="md">
            <NavbarBrand href="/">葫芦岛市龙港区智慧环境管理系统 {message}</NavbarBrand>
            <Nav className="ml-auto" navbar>
                <Dropdown isOpen={this.state.dropdown} toggle={this.dropdownToggle} style={{'margin-right': 20}}>
                    <Dropdown.Toggle color="secondary" nav caret className="btn-secondary">
                        区域概况
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Header>主要企业</Dropdown.Header>
                        <Dropdown.Item>辖区全部企业</Dropdown.Item>
                        <Dropdown.Item>重点监管企业</Dropdown.Item>
                        <Dropdown.Item>一般监管企业</Dropdown.Item>
                        <Dropdown.Header>自然环境</Dropdown.Header>
                        <Dropdown.Item>气候气象</Dropdown.Item>
                        <Dropdown.Item>河流水系</Dropdown.Item>
                        <Dropdown.Item>地形地貌</Dropdown.Item>
                        <Dropdown.Item>地质类型</Dropdown.Item>
                        <Dropdown.Header>人口分布</Dropdown.Header>
                        <Dropdown.Item>人口聚集区</Dropdown.Item>
                        <Dropdown.Item>人口分布密度</Dropdown.Item>
                        <Dropdown.Header>交通干线</Dropdown.Header>
                        <Dropdown.Item>道路干线</Dropdown.Item>
                        <Dropdown.Item>车辆流量</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown isOpen={this.state.dropdown} toggle={this.dropdownToggle} style={{'margin-right': 20}}>
                    <Dropdown.Toggle color="secondary" nav caret className="btn-secondary">
                        环境现状
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Header>大气环境</Dropdown.Header>
                        <Dropdown.Item>质量日报（近1月）</Dropdown.Item>
                        <Dropdown.Item>质量月报（近1年）</Dropdown.Item>
                        <Dropdown.Item>质量年报（近5年）</Dropdown.Item>
                        <Dropdown.Header>水环境</Dropdown.Header>
                        <Dropdown.Item>质量日报（近1月）</Dropdown.Item>
                        <Dropdown.Item>质量月报（近1年）</Dropdown.Item>
                        <Dropdown.Item>质量年报（近5年）</Dropdown.Item>
                        <Dropdown.Header>土壤环境</Dropdown.Header>
                        <Dropdown.Item href="/EnvSoil">农田土壤环境质量</Dropdown.Item>
                        <Dropdown.Item>场地土壤风险等级</Dropdown.Item>
                        <Dropdown.Item>例行监测调查结果</Dropdown.Item>
                        <Dropdown.Header>固废危废</Dropdown.Header>
                        <Dropdown.Item>固体废物堆存</Dropdown.Item>
                        <Dropdown.Item>危险废物堆存</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown isOpen={this.state.dropdown} toggle={this.dropdownToggle} style={{'margin-right': 20}}>
                    <Dropdown.Toggle color="secondary" nav caret className="btn-secondary">
                        污染分析
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Header>污染扩散</Dropdown.Header>
                        <Dropdown.Item>大气污染扩散</Dropdown.Item>
                        <Dropdown.Item>地表径流扩散</Dropdown.Item>
                        <Dropdown.Header>污染累积</Dropdown.Header>
                        <Dropdown.Item>重金属污染物累积</Dropdown.Item>
                        <Dropdown.Item>有机污染物降解</Dropdown.Item>
                        <Dropdown.Header>情景预测</Dropdown.Header>
                        <Dropdown.Item>区域污染叠加</Dropdown.Item>
                        <Dropdown.Item>复合污染叠加</Dropdown.Item>
                        <Dropdown.Header>智慧判断</Dropdown.Header>
                        <Dropdown.Item>污染成因贡献</Dropdown.Item>
                        <Dropdown.Item>风险变化趋势</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown isOpen={this.state.dropdown} toggle={this.dropdownToggle} style={{'margin-right': 40}}>
                    <Dropdown.Toggle color="secondary" nav caret className="btn-secondary">
                        管理决策
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Header>排放总量控制</Dropdown.Header>
                        <Dropdown.Item>废气排放</Dropdown.Item>
                        <Dropdown.Item>废水排放</Dropdown.Item>
                        <Dropdown.Item>固废排放</Dropdown.Item>
                        <Dropdown.Header>环境容量控制</Dropdown.Header>
                        <Dropdown.Item>大气环境容量</Dropdown.Item>
                        <Dropdown.Item>地表水环境容量</Dropdown.Item>
                        <Dropdown.Item>土壤环境容量</Dropdown.Item>
                        <Dropdown.Header>污染排放阈值</Dropdown.Header>
                        <Dropdown.Item>介质环境阈值</Dropdown.Item>
                        <Dropdown.Item>污染物环境阈值</Dropdown.Item>
                        <Dropdown.Header>中长期管理</Dropdown.Header>
                        <Dropdown.Item>中期环境管理</Dropdown.Item>
                        <Dropdown.Item>长期环境管理</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <NavItem>{button}</NavItem>
            </Nav>
        </Navbar>;


    }
}