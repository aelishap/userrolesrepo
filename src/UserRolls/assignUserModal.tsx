import React, { useState, useEffect } from 'react';
import { Modal, Table, Checkbox, Button, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { userData } from './userList';

interface AssignUserModalProps {
  visible: boolean;
  onCancel: () => void;
  onAssign: (selectedUsers: string[]) => void;
  role: string | null;
}

interface User {
  userId: string;
  name: string;
  email: string;
}

const AssignUserModal: React.FC<AssignUserModalProps> = ({ visible, onCancel, onAssign, role }) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!visible) {
      setSelectedUsers([]);
    }
  }, [visible]);

  const handleUserSelection = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  const userColumns: ColumnsType<User> = [
    {
      title: 'Select',
      dataIndex: 'select',
      key: 'select',
      render: (_, record) => (
        <Checkbox
          checked={selectedUsers.includes(record.userId)}
          onChange={(e) => handleUserSelection(record.userId, e.target.checked)}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ];

  return (
    <Modal
      title={null}
      closable={false}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="assign" type="primary" onClick={() => {
          onAssign(selectedUsers);
          setSelectedUsers([]);
        }}>
          Assign
        </Button>,
      ]}
    >
      <Typography className='text-[#1677FF] hover:text-[#85a7d8] mb-2 text-[24px] font-semibold'>
        Assign Users to Role: {role}
      </Typography>
      <Table
        columns={userColumns}
        dataSource={userData}
        rowKey="userId"
        pagination={{ pageSize: 5 }}
      />
    </Modal>
  );
};

export default AssignUserModal;
