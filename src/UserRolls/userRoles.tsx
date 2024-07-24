import React, { useState } from 'react';
import { Table, Button, Typography, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import AssignUserModal from './assignUserModal';

interface UserRole {
  id: number;
  total: number;
  role: string;
}

interface AssignedUser {
  userId: string;
  role: string;
}

const UserRoles: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [roles, setRoles] = useState<UserRole[]>([
    { id: 1, total: 0, role: 'HR' },
    { id: 2, total: 0, role: 'Developer' },
    { id: 3, total: 0, role: 'Sales' },
  ]);
  const [assignedUsers, setAssignedUsers] = useState<AssignedUser[]>([]);

  const handleAddUser = (role: string) => {
    setSelectedRole(role);
    setIsModalVisible(true);
  };

  const handleAssign = (selectedUsers: string[]) => {
    let canAssign = true;

    selectedUsers.forEach(userId => {
      const existingAssignment = assignedUsers.find(user => user.userId === userId);
      if (existingAssignment) {
        canAssign = false;
        message.error(`User ${userId} is already assigned to ${existingAssignment.role} role.`);
      }
    });

    if (canAssign && selectedRole) {
      const newAssignments = selectedUsers.map(userId => ({ userId, role: selectedRole }));

      setAssignedUsers([...assignedUsers, ...newAssignments]);
      console.log(selectedRole, selectedUsers, 'selectedRole')
      const updateCount = roles.map(role => {
        if (role.role === selectedRole) {
          return { ...role, total: role.total + selectedUsers.length };
        }
        return role;
      })
      setRoles(updateCount);

      message.success(`Users assigned to ${selectedRole} role successfully.`);
      setIsModalVisible(false);
    }
  };

  const columns: ColumnsType<UserRole> = [
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Total User',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <Button onClick={() => handleAddUser(record.role)} type='primary'>
          Add User
        </Button>
      ),
    },
  ];

  return (
    <div className='px-8'>
      <Typography className='text-[#1677FF] hover:text-[#85a7d8] mt-16 mb-4 text-[24px] font-semibold'>
        User Roles
      </Typography>
      <Table columns={columns} dataSource={roles} rowKey="id" className='w-full' />
      <AssignUserModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onAssign={handleAssign}
        role={selectedRole}
      />
    </div>
  );
};

export default UserRoles;
