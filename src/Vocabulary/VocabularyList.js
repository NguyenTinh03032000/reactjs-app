import React, { Component, useState } from "react";
import { withRouter } from "react-router-dom";
import './VocabularyList.css';
import { Button, Table } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

class VocabularyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vocabularies: [
                {
                    id: 1,
                    vocabulary: 'Hello',
                    mean: 'Xin chào',
                },
                {
                    id: 2,
                    vocabulary: 'Sorry',
                    mean: 'Xin lỗi',
                }],
            isLoading: false
        }
    }

    render() {


        const columns = [
            {
                key: '1',
                title: 'ID',
                dataIndex: 'id'
            },
            {
                key: '2',
                title: 'Vocabulary',
                dataIndex: 'vocabulary'
            },
            {
                key: '3',
                title: 'Mean',
                dataIndex: 'mean'
            },
            {
                key: '4',
                title: "Actions",
                render: (record) => {
                    return (
                        <>
                            <EditOutlined />
                        </>
                    );
                },
            },
        ];
        return (
            <div className="vocabulary-container">
                <header className="App-header">
                    <Button >Add a new vocabulary</Button>
                    <Table columns={columns} dataSource={this.state.vocabularies}></Table>
                </header>
            </div>
        );
    }
}

export default withRouter(VocabularyList);