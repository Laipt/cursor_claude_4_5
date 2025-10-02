// 树形数据处理工具

/**
 * 数组转树形结构
 * @param list 数组数据
 * @param id ID字段名
 * @param parentId 父ID字段名
 * @param children 子节点字段名
 */
export function arrayToTree<T = any>(
  list: T[],
  id: string = 'id',
  parentId: string = 'parentId',
  children: string = 'children'
): T[] {
  const map: Record<string, any> = {}
  const result: T[] = []

  // 建立ID映射
  list.forEach((item: any) => {
    map[item[id]] = { ...item }
  })

  // 构建树形结构
  list.forEach((item: any) => {
    const parent = map[item[parentId]]
    if (parent) {
      if (!parent[children]) {
        parent[children] = []
      }
      parent[children].push(map[item[id]])
    } else {
      result.push(map[item[id]])
    }
  })

  return result
}

/**
 * 树形结构转数组
 * @param tree 树形数据
 * @param children 子节点字段名
 */
export function treeToArray<T = any>(
  tree: T[],
  children: string = 'children'
): T[] {
  const result: T[] = []

  const traverse = (nodes: T[]) => {
    nodes.forEach((node: any) => {
      const { [children]: childNodes, ...rest } = node
      result.push(rest as T)
      if (childNodes && childNodes.length > 0) {
        traverse(childNodes)
      }
    })
  }

  traverse(tree)
  return result
}

/**
 * 查找树节点
 * @param tree 树形数据
 * @param predicate 查找条件
 * @param children 子节点字段名
 */
export function findNode<T = any>(
  tree: T[],
  predicate: (node: T) => boolean,
  children: string = 'children'
): T | null {
  for (const node of tree) {
    if (predicate(node)) {
      return node
    }
    const childNodes = (node as any)[children]
    if (childNodes && childNodes.length > 0) {
      const found = findNode(childNodes, predicate, children)
      if (found) {
        return found
      }
    }
  }
  return null
}

/**
 * 过滤树节点
 * @param tree 树形数据
 * @param predicate 过滤条件
 * @param children 子节点字段名
 */
export function filterTree<T = any>(
  tree: T[],
  predicate: (node: T) => boolean,
  children: string = 'children'
): T[] {
  return tree.filter((node: any) => {
    const childNodes = node[children]
    if (childNodes && childNodes.length > 0) {
      node[children] = filterTree(childNodes, predicate, children)
    }
    return predicate(node) || (node[children] && node[children].length > 0)
  })
}

/**
 * 遍历树节点
 * @param tree 树形数据
 * @param callback 回调函数
 * @param children 子节点字段名
 */
export function traverseTree<T = any>(
  tree: T[],
  callback: (node: T, parent?: T) => void,
  children: string = 'children',
  parent?: T
): void {
  tree.forEach((node: any) => {
    callback(node, parent)
    const childNodes = node[children]
    if (childNodes && childNodes.length > 0) {
      traverseTree(childNodes, callback, children, node)
    }
  })
}

