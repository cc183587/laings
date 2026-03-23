# 防火墙配置说明

## 方法 1:图形界面配置(推荐新手)

### 为 Node.js 添加入站规则

1. **打开防火墙设置**
   - 按 `Win + R`,输入 `wf.msc`,回车

2. **创建新规则**
   - 点击左侧"入站规则"
   - 点击右侧"新建规则"

3. **配置规则**
   - 规则类型:选择"端口"
   - 协议和端口:选择 TCP,特定本地端口填入 `5173,3001`
   - 操作:选择"允许连接"
   - 配置文件:全部勾选(域、专用、公用)
   - 名称:输入 `Node.js Blog Server`

4. **完成**
   - 点击"完成"即可

## 方法 2:PowerShell 一键配置(推荐)

**以管理员身份**运行 PowerShell,复制粘贴以下命令:

```powershell
# 为 Node.js 添加防火墙规则(前端 5173 和后端 3001)
New-NetFirewallRule -DisplayName "Node.js Blog Frontend (5173)" -Direction Inbound -LocalPort 5173 -Protocol TCP -Action Allow
New-NetFirewallRule -DisplayName "Node.js Blog Backend (3001)" -Direction Inbound -LocalPort 3001 -Protocol TCP -Action Allow

Write-Host "✅ 防火墙规则添加成功!" -ForegroundColor Green
Write-Host "现在可以局域网访问了" -ForegroundColor Green
```

## 方法 3:临时关闭防火墙(仅测试用)

⚠️ **警告**:关闭防火墙会降低系统安全性,仅用于测试!

1. **打开防火墙设置**
   - 控制面板 → Windows Defender 防火墙
   - 点击"启用或关闭 Windows Defender 防火墙"

2. **关闭防火墙**
   - 专用网络设置:选择"关闭 Windows Defender 防火墙"
   - 公用网络设置:选择"关闭 Windows Defender 防火墙"
   - 点击"确定"

3. **测试完成后记得重新开启!**

---

## 验证配置是否生效

运行以下命令查看规则是否创建成功:

```powershell
Get-NetFirewallRule | Where-Object {$_.DisplayName -like "*Node.js*"}
```

应该显示刚才创建的规则。

## 测试局域网访问

1. 运行 `start-lan.bat` 获取 IP 地址
2. 在手机浏览器输入:`http://你的IP:5173`
3. 如果能正常打开,说明配置成功!

---

## 常见问题

### Q:PowerShell 报错"权限不足"
**A**:需要以管理员身份运行 PowerShell
- 右键点击 PowerShell → "以管理员身份运行"

### Q:添加规则后还是访问不了
**A**:可能需要重启服务
```powershell
# 重启防火墙服务
netsh advfirewall set allprofiles state off
netsh advfirewall set allprofiles state on
```

### Q:不想手动配置,有没有更简单的方法?
**A**:可以用方法 3 临时关闭防火墙测试,如果能访问,说明是防火墙问题,再用方法 2 添加规则。
