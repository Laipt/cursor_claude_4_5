// 将dist-esm目录下的.js文件重命名为.mjs并移动到dist目录
const fs = require('fs');
const path = require('path');

const distEsmDir = path.join(__dirname, '../dist-esm');
const distDir = path.join(__dirname, '../dist');

function renameJsToMjs(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      renameJsToMjs(fullPath);
    } else if (file.endsWith('.js')) {
      // 计算相对路径
      const relativePath = path.relative(distEsmDir, fullPath);
      const targetPath = path.join(distDir, relativePath).replace(/\.js$/, '.mjs');
      
      // 确保目标目录存在
      const targetDir = path.dirname(targetPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      
      // 读取文件内容并更新import路径
      let content = fs.readFileSync(fullPath, 'utf-8');
      
      // 更新import/export语句中的.js扩展名为.mjs
      content = content.replace(/from ['"](.*)\.js['"]/g, 'from \'$1.mjs\'');
      content = content.replace(/require\(['"](.*)\.js['"]\)/g, 'require(\'$1.mjs\')');
      
      // 写入目标文件
      fs.writeFileSync(targetPath, content);
    }
  });
}

// 开始重命名
renameJsToMjs(distEsmDir);

// 删除dist-esm目录
fs.rmSync(distEsmDir, { recursive: true, force: true });

console.log('ES modules generated successfully!');

