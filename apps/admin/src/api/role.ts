// 角色API

import request from '@/utils/request'
import { Role, RoleQuery, RoleForm } from '@/types/role'
import { PageResult } from '@/types/common'

/**
 * 角色列表
 */
export function getRoleList(params: RoleQuery): Promise<PageResult<Role>> {
  return request({
    url: '/role/list',
    method: 'get',
    params
  })
}

/**
 * 获取所有角色(不分页)
 */
export function getAllRoles(): Promise<Role[]> {
  return request({
    url: '/role/all',
    method: 'get'
  })
}

/**
 * 获取角色详情
 */
export function getRole(roleId: number): Promise<Role> {
  return request({
    url: `/role/${roleId}`,
    method: 'get'
  })
}

/**
 * 新增角色
 */
export function addRole(data: RoleForm): Promise<Role> {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}

/**
 * 更新角色
 */
export function updateRole(roleId: number, data: RoleForm): Promise<Role> {
  return request({
    url: `/role/${roleId}`,
    method: 'put',
    data
  })
}

/**
 * 删除角色
 */
export function deleteRole(roleId: number): Promise<void> {
  return request({
    url: `/role/${roleId}`,
    method: 'delete'
  })
}

