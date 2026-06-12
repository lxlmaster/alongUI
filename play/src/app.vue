<template>
  <main class="workbench" :data-theme="isDark ? 'dark' : undefined">
    <aside class="sidebar">
      <div>
        <p class="eyebrow">alongUI</p>
        <h1>组件工作台</h1>
      </div>
      <nav class="nav-list" aria-label="组件导航">
        <a href="/prototype.html" class="nav-home">完整原型</a>
        <div class="nav-group">
          <p class="nav-group-title">Basic</p>
          <a href="#button">Button</a>
          <a href="#button-group">ButtonGroup</a>
          <a href="#link">Link</a>
          <a href="#icon">Icon</a>
          <a href="#typography">Typography</a>
          <a href="#avatar">Avatar</a>
          <a href="#card">Card</a>
        </div>
        <div class="nav-group">
          <p class="nav-group-title">Form Core</p>
          <a href="#form">Form</a>
          <a href="#input">Input</a>
          <a href="#select">Select</a>
          <a href="#switch">Switch</a>
          <a href="#checkbox">Checkbox</a>
          <a href="#checkbox-group">CheckboxGroup</a>
          <a href="#radio">Radio</a>
        </div>
        <div class="nav-group">
          <p class="nav-group-title">Form Extended</p>
          <a href="#cascader">Cascader</a>
          <a href="#date-picker">DatePicker</a>
          <a href="#time-picker">TimePicker</a>
          <a href="#upload">Upload</a>
          <a href="#color-picker">ColorPicker</a>
          <a href="#slider">Slider</a>
          <a href="#rate">Rate</a>
        </div>
        <div class="nav-group">
          <p class="nav-group-title">Data</p>
          <a href="#table">Table</a>
          <a href="#pagination">Pagination</a>
          <a href="#tag">Tag</a>
          <a href="#badge">Badge</a>
          <a href="#progress">Progress</a>
          <a href="#empty">Empty</a>
          <a href="#skeleton">Skeleton</a>
          <a href="#tree">Tree</a>
        </div>
        <div class="nav-group">
          <p class="nav-group-title">Feedback</p>
          <a href="#tooltip">Tooltip</a>
          <a href="#popover">Popover</a>
          <a href="#dropdown">Dropdown</a>
          <a href="#dialog">Dialog</a>
          <a href="#drawer">Drawer</a>
          <a href="#message">Message</a>
          <a href="#notification">Notification</a>
          <a href="#message-box">MessageBox</a>
          <a href="#loading">Loading</a>
        </div>
        <div class="nav-group">
          <p class="nav-group-title">Navigation</p>
          <a href="#breadcrumb">Breadcrumb</a>
          <a href="#menu">Menu</a>
          <a href="#tabs">Tabs</a>
          <a href="#steps">Steps</a>
        </div>
        <div class="nav-group">
          <p class="nav-group-title">Layout</p>
          <a href="#page">Page</a>
          <a href="#stack">Stack</a>
          <a href="#spacer">Spacer</a>
          <a href="#divider">Divider</a>
          <a href="#grid">Grid</a>
          <a href="#center">Center</a>
          <a href="#container">Container</a>
        </div>
        <div class="nav-group">
          <p class="nav-group-title">Media</p>
          <a href="#image">Image</a>
          <a href="#video">Video</a>
          <a href="#calendar">Calendar</a>
          <a href="#carousel">Carousel</a>
        </div>
        <div class="nav-group">
          <p class="nav-group-title">Other</p>
          <a href="#collapse">Collapse</a>
          <a href="#descriptions">Descriptions</a>
          <a href="#affix">Affix</a>
          <a href="#backtop">BackTop</a>
        </div>
      </nav>
      <al-button class="theme-toggle" :type="isDark ? 'primary' : 'default'" @click="toggleTheme">
        {{ isDark ? '浅色模式' : '暗色模式' }}
      </al-button>
    </aside>

    <section class="stage">
      <header class="stage-header">
        <div>
          <p class="eyebrow">Workbench</p>
          <h2>全量组件接入与交互校验</h2>
        </div>
        <al-tooltip content="当前工作台已接入 40+ 个组件进行联调展示">
          <al-button type="primary">已接入 40+ 项</al-button>
        </al-tooltip>
      </header>

      <section id="basic" class="component-section">
        <div class="section-title">
          <p class="eyebrow">Basic</p>
          <h3>Button / Link / Icon / Typography / Avatar / Card</h3>
        </div>
        <div class="component-anchor-list">
          <div id="button" class="component-anchor"></div>
          <div id="button-group" class="component-anchor"></div>
        </div>
        <div class="preview-row">
          <al-button>默认按钮</al-button>
          <al-button type="primary">主要按钮</al-button>
          <al-button type="success">成功按钮</al-button>
          <al-button type="warning">警告按钮</al-button>
          <al-button type="danger">危险按钮</al-button>
        </div>
        <div class="preview-row">
          <al-button-group>
            <al-button>上一步</al-button>
            <al-button type="primary">保存草稿</al-button>
            <al-button>下一步</al-button>
          </al-button-group>
        </div>
        <div class="component-anchor-list">
          <div id="link" class="component-anchor"></div>
          <div id="icon" class="component-anchor"></div>
        </div>
        <div class="preview-row">
          <al-link href="https://github.com/lxlmaster/alongUI" target="_blank">GitHub</al-link>
          <al-link type="primary">主要链接</al-link>
          <al-link disabled>禁用链接</al-link>
          <al-icon :size="18" color="#1d1d1f"><SearchIcon /></al-icon>
          <al-icon :size="24" color="#30d158"><CheckIcon /></al-icon>
          <al-icon :size="28" color="#ff9f0a"><AlertIcon /></al-icon>
        </div>
        <div class="component-anchor-list">
          <div id="typography" class="component-anchor"></div>
          <div id="avatar" class="component-anchor"></div>
          <div id="card" class="component-anchor"></div>
        </div>
        <div class="preview-row preview-row--stretch">
          <div class="type-block">
            <al-title :level="3">Typography</al-title>
            <al-text>默认正文用于中后台常规描述。</al-text>
            <al-text type="secondary">辅助文案用于降低视觉优先级。</al-text>
            <al-text type="disabled">禁用状态内容</al-text>
          </div>
          <div class="avatar-row">
            <al-avatar alt="A" />
            <al-avatar shape="square" alt="D" />
            <al-avatar :size="48" alt="L" />
          </div>
          <al-card header="Apple 风格卡片" shadow="hover" class="mini-card">
            <al-text type="secondary">用于承载独立信息块与摘要内容。</al-text>
          </al-card>
        </div>
      </section>

      <section id="form-core" class="component-section">
        <div class="section-title">
          <p class="eyebrow">Form</p>
          <h3>Form / Input / Select / Switch / Checkbox / Radio</h3>
        </div>
        <div class="component-anchor-list">
          <div id="form" class="component-anchor"></div>
          <div id="input" class="component-anchor"></div>
          <div id="select" class="component-anchor"></div>
          <div id="switch" class="component-anchor"></div>
          <div id="checkbox" class="component-anchor"></div>
          <div id="checkbox-group" class="component-anchor"></div>
          <div id="radio" class="component-anchor"></div>
        </div>
        <al-form ref="profileFormRef" :model="profileForm" :rules="profileRules" label-width="84px" class="demo-form">
          <div class="form-grid">
            <al-form-item label="姓名" prop="name">
              <al-input v-model="profileForm.name" placeholder="请输入姓名" clearable />
            </al-form-item>
            <al-form-item label="邮箱" prop="email">
              <al-input v-model="profileForm.email" placeholder="name@example.com">
                <template #prefix>
                  <al-icon :size="14"><MailIcon /></al-icon>
                </template>
              </al-input>
            </al-form-item>
            <al-form-item label="状态" prop="status">
              <al-select
                v-model="profileForm.status"
                :options="statusOptions"
                placeholder="请选择状态"
                clearable
              />
            </al-form-item>
            <al-form-item label="标签">
              <al-select
                v-model="profileForm.tags"
                :options="tagOptions"
                multiple
                collapse-tags
                clearable
              />
            </al-form-item>
          </div>
          <div class="form-grid">
            <al-form-item label="通知">
              <al-switch v-model="notificationEnabled" active-text="开启" inactive-text="关闭" />
            </al-form-item>
            <al-form-item label="自动保存">
              <al-switch v-model="autoSave" loading active-text="同步" inactive-text="暂停" />
            </al-form-item>
          </div>
          <div class="choice-grid">
            <al-form-item label="权限">
              <al-stack direction="row" spacing="4" wrap>
                <al-checkbox v-model="permissionDraft">草稿</al-checkbox>
                <al-checkbox v-model="permissionPublish">发布</al-checkbox>
                <al-checkbox v-model="permissionReview" indeterminate>审核中</al-checkbox>
              </al-stack>
            </al-form-item>
            <al-form-item label="角色">
              <al-radio-group v-model="roleValue">
                <al-stack direction="row" spacing="4" wrap>
                  <al-radio label="owner">Owner</al-radio>
                  <al-radio label="editor">Editor</al-radio>
                  <al-radio label="viewer">Viewer</al-radio>
                </al-stack>
              </al-radio-group>
            </al-form-item>
          </div>
          <al-form-item label="勾选组">
            <al-checkbox-group v-model="checkboxGroupValue">
              <al-stack direction="row" spacing="4" wrap>
                <al-checkbox label="email">邮件提醒</al-checkbox>
                <al-checkbox label="sms">短信提醒</al-checkbox>
                <al-checkbox label="workbench">工作台通知</al-checkbox>
              </al-stack>
            </al-checkbox-group>
          </al-form-item>
          <al-form-item label="备注">
            <al-input
              v-model="profileForm.notes"
              type="textarea"
              placeholder="输入一些背景说明"
              :maxlength="120"
              show-word-limit
            />
          </al-form-item>
          <div class="preview-row">
            <al-button type="primary" @click="validateProfileForm">校验表单</al-button>
            <al-button @click="resetProfileForm">重置</al-button>
          </div>
        </al-form>
      </section>

      <section id="form-extended" class="component-section">
        <div class="section-title">
          <p class="eyebrow">Extended Form</p>
          <h3>Cascader / DatePicker / TimePicker / Upload / ColorPicker / Slider / Rate</h3>
        </div>
        <div class="component-anchor-list">
          <div id="cascader" class="component-anchor"></div>
          <div id="date-picker" class="component-anchor"></div>
          <div id="time-picker" class="component-anchor"></div>
          <div id="color-picker" class="component-anchor"></div>
          <div id="rate" class="component-anchor"></div>
        </div>
        <div class="form-grid">
          <label>
            <span>级联选择</span>
            <al-cascader v-model="regionValue" :options="regionOptions" placeholder="选择组织结构" />
          </label>
          <label>
            <span>日期</span>
            <al-date-picker v-model="dateValue" clearable />
          </label>
          <label>
            <span>日期范围</span>
            <al-date-picker v-model="dateRangeValue" type="daterange" clearable />
          </label>
          <label>
            <span>时间</span>
            <al-time-picker v-model="timeValue" clearable />
          </label>
          <label>
            <span>评分</span>
            <al-rate v-model="rateValue" />
          </label>
          <label>
            <span>品牌色</span>
            <al-color-picker v-model="colorValue" />
          </label>
        </div>
        <div id="slider" class="component-anchor"></div>
        <label class="textarea-field">
          <span>优先级滑块</span>
          <al-slider v-model="sliderValue" />
        </label>
        <div id="upload" class="component-anchor"></div>
        <div class="upload-row">
          <al-upload :limit="3" :file-size="5">
            <al-button type="primary">点击上传</al-button>
            <template #tip>
              上传文件后会在列表中展示状态
            </template>
          </al-upload>
          <al-upload drag :limit="2">
            <template #tip>
              拖拽体验适合附件与图片批量导入
            </template>
          </al-upload>
        </div>
      </section>

      <section id="data-display" class="component-section">
        <div class="section-title">
          <p class="eyebrow">Data</p>
          <h3>Table / Pagination / Tag / Badge / Progress / Empty / Skeleton / Tree</h3>
        </div>
        <div class="component-anchor-list">
          <div id="tag" class="component-anchor"></div>
          <div id="badge" class="component-anchor"></div>
          <div id="progress" class="component-anchor"></div>
        </div>
        <div class="preview-row preview-row--stretch">
          <div class="tag-row">
            <al-tag>默认标签</al-tag>
            <al-tag type="success">已完成</al-tag>
            <al-tag type="warning">待处理</al-tag>
            <al-tag type="danger" closable @close="handleTagClose">高风险</al-tag>
          </div>
          <div class="badge-row">
            <al-badge :value="12">
              <al-button>消息</al-button>
            </al-badge>
            <al-badge :value="108" :max="99">
              <al-button>提醒</al-button>
            </al-badge>
            <al-badge is-dot>
              <al-button>状态</al-button>
            </al-badge>
          </div>
        </div>
        <div class="progress-row">
          <div class="progress-item">
            <al-progress :percentage="72" />
          </div>
          <div class="progress-item">
            <al-progress :percentage="48" type="circle" />
          </div>
          <div class="progress-item">
            <al-progress :percentage="91" type="circle" size="small" />
          </div>
        </div>
        <al-table
          id="table"
          :data="pagedTableData"
          stripe
          border
          highlight-current-row
          max-height="280px"
          class="demo-table"
          @row-click="handleRowClick"
        >
          <al-table-column prop="name" label="项目名称" width="180" sortable />
          <al-table-column prop="owner" label="负责人" width="120" />
          <al-table-column prop="status" label="状态" width="120" />
          <al-table-column prop="progress" label="进度" width="120" align="right" />
          <al-table-column label="标签" width="160">
            <template #default="{ row }">
              <al-tag size="small" type="info">{{ row.label }}</al-tag>
            </template>
          </al-table-column>
        </al-table>
        <div id="pagination" class="component-anchor"></div>
        <div class="preview-row preview-row--between">
          <al-pagination
            :current="tableCurrentPage"
            :page-size="tablePageSize"
            :total="tableData.length"
            background
            layout="total, prev, pager, next"
            @update:current="tableCurrentPage = $event"
            @update:pageSize="tablePageSize = $event"
          />
          <al-button size="small" @click="toggleSkeleton">
            {{ skeletonLoading ? '显示内容' : '显示骨架' }}
          </al-button>
        </div>
        <div class="component-anchor-list">
          <div id="skeleton" class="component-anchor"></div>
          <div id="empty" class="component-anchor"></div>
          <div id="tree" class="component-anchor"></div>
        </div>
        <div class="data-grid">
          <al-skeleton :loading="skeletonLoading" animated class="skeleton-panel">
            <div class="skeleton-content">
              <strong>骨架屏</strong>
              <p>用于列表、详情和抽屉的异步加载阶段。</p>
            </div>
          </al-skeleton>
          <al-empty description="当前筛选条件下暂无数据">
            <template #action>
              <al-button size="small">清空筛选</al-button>
            </template>
          </al-empty>
          <al-tree :data="treeData" show-checkbox default-expand-all />
        </div>
      </section>

      <section id="feedback" v-loading="panelLoading" class="component-section loading-demo">
        <div class="section-title">
          <p class="eyebrow">Feedback</p>
          <h3>Tooltip / Popover / Dropdown / Dialog / Drawer / Message / Notification / MessageBox / Loading</h3>
        </div>
        <div class="component-anchor-list">
          <div id="tooltip" class="component-anchor"></div>
          <div id="popover" class="component-anchor"></div>
          <div id="dropdown" class="component-anchor"></div>
        </div>
        <div class="preview-row">
          <al-tooltip content="保存当前配置" placement="top">
            <al-button type="primary">Tooltip</al-button>
          </al-tooltip>
          <al-popover title="批注" content="适合承载短说明和补充操作。">
            <al-button>Popover</al-button>
          </al-popover>
          <al-dropdown>
            <al-button>Dropdown</al-button>
            <template #dropdown>
              <div class="dropdown-menu">
                <button class="dropdown-item" type="button">查看详情</button>
                <button class="dropdown-item" type="button">复制链接</button>
                <button class="dropdown-item" type="button">移入归档</button>
              </div>
            </template>
          </al-dropdown>
        </div>
        <div class="component-anchor-list">
          <div id="dialog" class="component-anchor"></div>
          <div id="drawer" class="component-anchor"></div>
          <div id="message" class="component-anchor"></div>
          <div id="notification" class="component-anchor"></div>
          <div id="message-box" class="component-anchor"></div>
          <div id="loading" class="component-anchor"></div>
        </div>
        <div class="preview-row">
          <al-button @click="dialogVisible = true">打开 Dialog</al-button>
          <al-button @click="drawerVisible = true">打开 Drawer</al-button>
          <al-button @click="showSuccessMessage">Message</al-button>
          <al-button @click="showNotification">Notification</al-button>
          <al-button @click="showAlertBox">MessageBox</al-button>
          <al-button @click="showPanelLoading">局部 Loading</al-button>
          <al-button @click="showFullLoading">全屏 Loading</al-button>
        </div>
        <al-dialog v-model="dialogVisible" title="编辑策略" draggable>
          <p class="dialog-copy">Dialog 适合承载中断性确认和短表单编辑。</p>
          <template #footer>
            <div class="preview-row preview-row--right">
              <al-button @click="dialogVisible = false">取消</al-button>
              <al-button type="primary" @click="confirmDialog">保存</al-button>
            </div>
          </template>
        </al-dialog>
        <al-drawer v-model="drawerVisible" title="批量设置" size="420px">
          <div class="drawer-copy">
            <p>Drawer 适合不打断上下文的侧边编辑。</p>
            <al-checkbox v-model="drawerSync">自动同步</al-checkbox>
            <al-checkbox v-model="drawerNotify">发送通知</al-checkbox>
          </div>
        </al-drawer>
      </section>

      <section id="navigation" class="component-section">
        <div class="section-title">
          <p class="eyebrow">Navigation</p>
          <h3>Menu / Tabs / Breadcrumb / Steps</h3>
        </div>
        <div class="component-anchor-list">
          <div id="breadcrumb" class="component-anchor"></div>
          <div id="menu" class="component-anchor"></div>
          <div id="steps" class="component-anchor"></div>
          <div id="tabs" class="component-anchor"></div>
        </div>
        <div class="nav-demo-grid">
          <div class="nav-demo-block">
            <al-breadcrumb separator="/">
              <al-breadcrumb-item>工作台</al-breadcrumb-item>
              <al-breadcrumb-item>质量运营</al-breadcrumb-item>
              <al-breadcrumb-item>策略中心</al-breadcrumb-item>
            </al-breadcrumb>
            <al-menu default-active="overview" class="menu-demo">
              <al-menu-item index="overview">概览</al-menu-item>
              <al-sub-menu index="quality">
                <template #title>质量域</template>
                <al-menu-item index="qa">质量分析</al-menu-item>
                <al-menu-item index="qc">巡检任务</al-menu-item>
              </al-sub-menu>
              <al-menu-item index="settings">设置</al-menu-item>
            </al-menu>
          </div>
          <div class="nav-demo-block">
            <al-steps :current="1">
              <al-step title="需求确认" description="定义交付边界" />
              <al-step title="组件接入" description="完成联调展示" />
              <al-step title="文档验收" description="补足说明与 API" />
            </al-steps>
            <al-tabs v-model="activeTab">
              <al-tab-pane label="概览" name="overview">
                <p class="tab-copy">当前展示核心运行态、交互态与数据态。</p>
              </al-tab-pane>
              <al-tab-pane label="规范" name="tokens">
                <p class="tab-copy">颜色、圆角、阴影与间距已统一到 Token。</p>
              </al-tab-pane>
              <al-tab-pane label="测试" name="tests">
                <p class="tab-copy">类型检查与测试已可作为持续回归基础。</p>
              </al-tab-pane>
            </al-tabs>
          </div>
        </div>
      </section>

      <section id="layout" class="component-section">
        <div class="section-title">
          <p class="eyebrow">Layout</p>
          <h3>Stack / Grid / Center / Spacer / Divider / Page / Container</h3>
        </div>
        <div class="component-anchor-list">
          <div id="page" class="component-anchor"></div>
          <div id="stack" class="component-anchor"></div>
          <div id="spacer" class="component-anchor"></div>
          <div id="divider" class="component-anchor"></div>
          <div id="grid" class="component-anchor"></div>
          <div id="center" class="component-anchor"></div>
        </div>
        <al-page class="page-demo">
          <template #header>
            <div>
              <p class="eyebrow">Page</p>
              <h3>策略中心</h3>
            </div>
          </template>
          <template #actions>
            <al-stack direction="row" spacing="3">
              <al-button>取消</al-button>
              <al-button type="primary">发布</al-button>
            </al-stack>
          </template>
          <al-divider content-position="left">Stack + Spacer</al-divider>
          <al-stack direction="row" spacing="3" align="center">
            <al-text>左侧标题</al-text>
            <al-spacer />
            <al-button size="small">操作一</al-button>
            <al-button size="small">操作二</al-button>
          </al-stack>
          <al-divider content-position="left">Grid</al-divider>
          <al-grid :columns="3" :spacing="4" class="mini-grid">
            <div class="grid-tile">概览</div>
            <div class="grid-tile">告警</div>
            <div class="grid-tile">报表</div>
            <div class="grid-tile">成员</div>
            <div class="grid-tile">流程</div>
            <div class="grid-tile">审计</div>
          </al-grid>
          <al-divider content-position="left">Center</al-divider>
          <al-center class="center-demo">
            <al-text type="secondary">用于空状态或加载占位的内容居中</al-text>
          </al-center>
        </al-page>
        <div id="container" class="component-anchor"></div>
        <div class="container-demo">
          <al-container>
            <al-header class="container-band">Header</al-header>
            <al-container>
              <al-aside class="container-side">Aside</al-aside>
              <al-main class="container-main">Main Content</al-main>
            </al-container>
            <al-footer class="container-band">Footer</al-footer>
          </al-container>
        </div>
      </section>

      <section id="media" class="component-section">
        <div class="section-title">
          <p class="eyebrow">Media</p>
          <h3>Image / Video / Carousel / Calendar</h3>
        </div>
        <div id="image" class="component-anchor"></div>
        <div class="preview-row preview-row--stretch">
          <al-image
            class="image-demo"
            :src="imageSources[0]"
            :preview-src-list="imageSources"
            fit="cover"
          />
          <al-image
            class="image-demo"
            :src="imageSources[1]"
            :preview-src-list="imageSources"
            fit="cover"
          />
        </div>
        <div class="component-anchor-list">
          <div id="video" class="component-anchor"></div>
          <div id="calendar" class="component-anchor"></div>
        </div>
        <div class="preview-row preview-row--stretch media-row">
          <div class="media-card">
            <al-text type="secondary">Video</al-text>
            <al-video
              :src="videoSource"
              :poster="imageSources[0]"
              :width="320"
              :height="180"
              controls
              muted
            />
          </div>
          <div class="media-card">
            <al-text type="secondary">Calendar</al-text>
            <al-calendar v-model="calendarDate" />
          </div>
        </div>
        <div id="carousel" class="component-anchor"></div>
        <div class="carousel-card">
          <al-text type="secondary">Carousel</al-text>
          <al-carousel height="180px" type="card">
            <al-carousel-item v-for="item in carouselSlides" :key="item.title">
              <div class="carousel-slide" :style="{ background: item.background }">
                <strong>{{ item.title }}</strong>
                <span>{{ item.copy }}</span>
              </div>
            </al-carousel-item>
          </al-carousel>
        </div>
      </section>

      <section id="other-tail" class="component-section">
        <div class="section-title">
          <p class="eyebrow">Other</p>
          <h3>Collapse / Descriptions / Affix / BackTop</h3>
        </div>
        <div class="component-anchor-list">
          <div id="collapse" class="component-anchor"></div>
          <div id="descriptions" class="component-anchor"></div>
        </div>
        <div class="data-grid">
          <div class="nav-demo-block">
            <al-collapse v-model="collapseValue">
              <al-collapse-item title="设计准则" name="spec">
                颜色、圆角、阴影和间距已经统一到 Apple 风格 Token。
              </al-collapse-item>
              <al-collapse-item title="交付状态" name="delivery">
                当前主线程正在继续把尾部组件接入工作台和文档站。
              </al-collapse-item>
            </al-collapse>
          </div>
          <div class="nav-demo-block">
            <al-descriptions title="交付摘要" border :column="2">
              <al-descriptions-item label="组件范围">55 个组件</al-descriptions-item>
              <al-descriptions-item label="当前联调">40+ 已挂载</al-descriptions-item>
              <al-descriptions-item label="类型检查">通过</al-descriptions-item>
              <al-descriptions-item label="测试状态">通过</al-descriptions-item>
            </al-descriptions>
          </div>
        </div>
        <div class="component-anchor-list">
          <div id="affix" class="component-anchor"></div>
          <div id="backtop" class="component-anchor"></div>
        </div>
        <div class="preview-row">
          <al-affix :offset="16">
            <al-button type="primary">Affix 示例</al-button>
          </al-affix>
          <al-text type="secondary">向下滚动超过 400px 后右下角会出现 BackTop。</al-text>
        </div>
        <al-backtop :right="32" :bottom="32" />
      </section>
    </section>

    <aside class="inspector">
      <p class="eyebrow">Tokens</p>
      <h2>当前主题</h2>
      <div class="token-list">
        <span style="--swatch: var(--al-color-primary)">Primary / Black</span>
        <span style="--swatch: var(--al-color-info)">Info / Blue</span>
        <span style="--swatch: var(--al-color-success)">Success</span>
        <span style="--swatch: var(--al-color-warning)">Warning</span>
        <span style="--swatch: var(--al-color-danger)">Danger</span>
      </div>
      <div class="inspector-note">
        <al-text type="secondary">
          当前工作台用于主线程联调展示，不再只停留在少量基础组件。
        </al-text>
      </div>
    </aside>
  </main>
</template>

<script setup lang="ts">
import { h, reactive, ref, computed } from 'vue'
import { ElMessageBox, LoadingService, Message, Notification } from '@along-ui/components'

const isDark = ref(false)
const panelLoading = ref(false)
const dialogVisible = ref(false)
const drawerVisible = ref(false)
const drawerSync = ref(true)
const drawerNotify = ref(false)
const activeTab = ref('overview')
const autoSave = ref(true)
const notificationEnabled = ref(false)
const regionValue = ref<string | number | undefined>('cn-hz-fe')
const dateValue = ref('2026-06-10')
const dateRangeValue = ref<[string, string]>(['2026-06-01', '2026-06-20'])
const timeValue = ref('09:30')
const calendarDate = ref(new Date('2026-06-10'))
const sliderValue = ref(64)
const rateValue = ref(4)
const colorValue = ref('#1D1D1F')
const tableCurrentPage = ref(1)
const tablePageSize = ref(5)
const skeletonLoading = ref(true)
const collapseValue = ref<Array<string | number>>(['spec'])
const permissionDraft = ref(true)
const permissionPublish = ref(false)
const permissionReview = ref(false)
const checkboxGroupValue = ref<Array<string | number | boolean>>(['email', 'workbench'])
const roleValue = ref('editor')
const profileFormRef = ref<any>()

const profileForm = reactive({
  name: '张三',
  email: 'zhangsan@example.com',
  status: 'progress',
  tags: ['design', 'frontend'],
  notes: '输入框、选择器与表单联调用于校验 Apple 风格主题下的中后台主流程。'
})

const profileRules = {
  name: [{ required: true, message: '请输入姓名' }],
  email: [
    { required: true, message: '请输入邮箱' },
    { pattern: /.+@.+\..+/, message: '邮箱格式不正确' }
  ],
  status: [{ required: true, message: '请选择状态' }]
}

const statusOptions = [
  { label: '进行中', value: 'progress' },
  { label: '已完成', value: 'done' },
  { label: '已归档', value: 'archived' }
]

const tagOptions = [
  { label: '设计', value: 'design' },
  { label: '前端', value: 'frontend' },
  { label: '规范', value: 'system' }
]

const regionOptions = [
  {
    label: '中国',
    value: 'cn',
    children: [
      {
        label: '杭州',
        value: 'cn-hz',
        children: [
          { label: '前端团队', value: 'cn-hz-fe' },
          { label: '质量团队', value: 'cn-hz-qa' }
        ]
      },
      {
        label: '上海',
        value: 'cn-sh',
        children: [
          { label: '平台团队', value: 'cn-sh-platform' }
        ]
      }
    ]
  }
]

const tableData = [
  { name: '组件接入清洗', owner: 'Along', status: '进行中', progress: '72%', label: '基础设施' },
  { name: '文档站补齐', owner: 'Codex', status: '排期中', progress: '48%', label: '文档' },
  { name: '导航组件联调', owner: 'Mia', status: '已完成', progress: '100%', label: '导航' },
  { name: '表单回归测试', owner: 'Liam', status: '进行中', progress: '65%', label: '测试' },
  { name: '设计 Token 校对', owner: 'Nina', status: '已完成', progress: '100%', label: '设计' },
  { name: '发布链路准备', owner: 'Kai', status: '排期中', progress: '30%', label: '发布' },
  { name: '工作台扩展', owner: 'Ava', status: '进行中', progress: '80%', label: '演示' }
]

const treeData = [
  {
    label: '质量平台',
    value: 'root',
    children: [
      {
        label: '巡检系统',
        value: 'inspect',
        children: [
          { label: '巡检任务', value: 'inspect-task' },
          { label: '巡检模板', value: 'inspect-template' }
        ]
      },
      {
        label: '指标中心',
        value: 'metrics',
        children: [
          { label: '质量分', value: 'metrics-score' },
          { label: '健康度', value: 'metrics-health' }
        ]
      }
    ]
  }
]

const imageSources = [
  'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="480" height="320"><rect width="100%" height="100%" fill="#f5f5f7"/><rect x="32" y="32" width="416" height="256" rx="18" fill="#ffffff" stroke="#d2d2d7"/><circle cx="118" cy="108" r="24" fill="#1d1d1f" opacity="0.12"/><rect x="160" y="88" width="180" height="16" rx="8" fill="#1d1d1f" opacity="0.18"/><rect x="160" y="120" width="120" height="12" rx="6" fill="#1d1d1f" opacity="0.1"/><rect x="64" y="182" width="352" height="54" rx="12" fill="#f2f2f7"/><rect x="84" y="198" width="156" height="10" rx="5" fill="#007aff" opacity="0.35"/><rect x="84" y="216" width="94" height="8" rx="4" fill="#1d1d1f" opacity="0.1"/></svg>'),
  'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="480" height="320"><rect width="100%" height="100%" fill="#ebebf0"/><rect x="40" y="40" width="400" height="240" rx="20" fill="#ffffff" stroke="#d2d2d7"/><rect x="68" y="72" width="344" height="20" rx="10" fill="#1d1d1f" opacity="0.14"/><rect x="68" y="112" width="210" height="12" rx="6" fill="#1d1d1f" opacity="0.09"/><rect x="68" y="156" width="320" height="88" rx="14" fill="#f5f5f7"/><circle cx="110" cy="200" r="20" fill="#30d158" opacity="0.3"/><rect x="144" y="188" width="180" height="12" rx="6" fill="#1d1d1f" opacity="0.12"/><rect x="144" y="210" width="120" height="10" rx="5" fill="#1d1d1f" opacity="0.08"/></svg>')
]

const videoSource = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'

const carouselSlides = [
  {
    title: 'Design Tokens',
    copy: '统一颜色、圆角、阴影和字号基线。',
    background: 'linear-gradient(135deg, #f5f5f7, #ffffff)'
  },
  {
    title: 'Form Workflow',
    copy: '覆盖输入、校验、选择和上传主路径。',
    background: 'linear-gradient(135deg, #eef4ff, #ffffff)'
  },
  {
    title: 'Data Surfaces',
    copy: '表格、分页、树、标签和反馈态联调。',
    background: 'linear-gradient(135deg, #edf9f0, #ffffff)'
  }
]

const SearchIcon = {
  render: () =>
    h('svg', { viewBox: '0 0 24 24', fill: 'none' }, [
      h('circle', { cx: '11', cy: '11', r: '7', stroke: 'currentColor', 'stroke-width': '2' }),
      h('path', { d: 'M16.5 16.5 21 21', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round' })
    ])
}

const CheckIcon = {
  render: () =>
    h('svg', { viewBox: '0 0 24 24', fill: 'none' }, [
      h('path', { d: 'M5 12.5 9.5 17 19 7', stroke: 'currentColor', 'stroke-width': '2.2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
    ])
}

const AlertIcon = {
  render: () =>
    h('svg', { viewBox: '0 0 24 24', fill: 'none' }, [
      h('path', { d: 'M12 4 21 20H3L12 4Z', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linejoin': 'round' }),
      h('path', { d: 'M12 9v5', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round' }),
      h('circle', { cx: '12', cy: '17', r: '1', fill: 'currentColor' })
    ])
}

const MailIcon = {
  render: () =>
    h('svg', { viewBox: '0 0 24 24', fill: 'none' }, [
      h('rect', { x: '4', y: '6', width: '16', height: '12', rx: '2', stroke: 'currentColor', 'stroke-width': '2' }),
      h('path', { d: 'M5 8l7 5 7-5', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
    ])
}

const pagedTableData = computed(() => {
  const start = (tableCurrentPage.value - 1) * tablePageSize.value
  return tableData.slice(start, start + tablePageSize.value)
})

function toggleTheme() {
  isDark.value = !isDark.value
}

async function validateProfileForm() {
  try {
    await profileFormRef.value?.validate?.()
    Message.success('表单校验通过')
  } catch {
    Message.warning('表单仍有未完成项')
  }
}

function resetProfileForm() {
  profileFormRef.value?.resetFields?.()
  Message.info('表单已重置')
}

function handleTagClose() {
  Message.info('标签已关闭')
}

function handleRowClick(row: { name: string }) {
  Notification.info({
    title: '当前行',
    message: `已选中 ${row.name}`
  })
}

function toggleSkeleton() {
  skeletonLoading.value = !skeletonLoading.value
}

function showSuccessMessage() {
  Message.success('保存成功，已同步到工作台状态')
}

function showNotification() {
  Notification.success({
    title: '发布成功',
    message: '组件工作台已经切换为全量接入模式'
  })
}

async function showAlertBox() {
  try {
    await ElMessageBox.confirm('是否确认将当前演示状态作为基线？', '确认')
    Message.success('已确认当前基线')
  } catch {
    Message.warning('已取消本次确认')
  }
}

function showPanelLoading() {
  panelLoading.value = true
  window.setTimeout(() => {
    panelLoading.value = false
  }, 1200)
}

function showFullLoading() {
  const instance = LoadingService({
    text: '同步组件状态',
    fullscreen: true
  })

  window.setTimeout(() => {
    instance.close()
  }, 1200)
}

function confirmDialog() {
  dialogVisible.value = false
  Message.success('策略已保存')
}
</script>

<style scoped>
.workbench {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr) 240px;
  min-height: 100vh;
  color: var(--al-text-color-primary);
  background: var(--al-bg-color);
}

.workbench[data-theme='dark'] {
  color-scheme: dark;
}

.sidebar,
.inspector {
  position: sticky;
  top: 0;
  height: 100vh;
  padding: 28px;
  background: var(--al-bg-color-overlay);
  border-color: var(--al-border-color-light);
}

.sidebar {
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--al-border-color-light);
}

.inspector {
  border-left: 1px solid var(--al-border-color-light);
}

.eyebrow {
  margin: 0 0 6px;
  color: var(--al-text-color-secondary);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

h1,
h2,
h3 {
  margin: 0;
  letter-spacing: 0;
}

h1 {
  font-size: 24px;
}

h2 {
  font-size: 22px;
}

h3 {
  font-size: 18px;
}

.nav-list {
  display: grid;
  flex: 1;
  gap: 16px;
  min-height: 0;
  margin: 36px 0;
  overflow-y: auto;
  padding-right: 8px;
}

.nav-home,
.nav-group a {
  display: block;
}

.nav-group {
  display: grid;
  gap: 6px;
}

.nav-group-title {
  margin: 0;
  color: var(--al-text-color-primary);
  font-size: 12px;
  font-weight: 600;
}

.nav-list a {
  padding: 4px 0;
  color: var(--al-text-color-secondary);
  text-decoration: none;
}

.nav-list a:hover {
  color: var(--al-color-primary);
}

.theme-toggle {
  margin-top: auto;
}

.stage {
  padding: 36px;
}

.stage-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
}

.component-section {
  position: relative;
  padding: 28px 0;
  border-top: 1px solid var(--al-border-color-light);
}

.component-section:first-of-type {
  border-top: 0;
}

.section-title {
  margin-bottom: 18px;
}

.component-anchor-list {
  display: block;
}

.component-anchor {
  display: block;
  height: 0;
  scroll-margin-top: 24px;
}

.preview-row,
.progress-row,
.badge-row,
.tag-row,
.avatar-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.preview-row--stretch {
  align-items: stretch;
}

.preview-row--between {
  justify-content: space-between;
}

.preview-row--right {
  justify-content: flex-end;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 16px;
}

.form-grid label,
.textarea-field {
  display: grid;
  gap: 8px;
  color: var(--al-text-color-secondary);
  font-size: var(--al-font-size-callout);
}

.choice-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.textarea-field {
  max-width: 720px;
}

.type-block {
  display: grid;
  gap: 10px;
  min-width: 240px;
}

.mini-card {
  width: 260px;
}

.demo-form {
  max-width: 900px;
}

.upload-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  align-items: start;
}

.demo-table {
  margin-bottom: 16px;
}

.data-grid,
.nav-demo-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  align-items: start;
}

.skeleton-panel,
.nav-demo-block {
  min-height: 180px;
}

.skeleton-content,
.drawer-copy,
.dialog-copy,
.tab-copy {
  color: var(--al-text-color-secondary);
  line-height: 1.7;
}

.progress-item {
  width: 140px;
}

.dropdown-menu {
  display: grid;
  gap: 6px;
  min-width: 140px;
}

.dropdown-item {
  padding: 8px 10px;
  color: var(--al-text-color-regular);
  background: transparent;
  border: 0;
  text-align: left;
  cursor: pointer;
}

.dropdown-item:hover {
  background: var(--al-bg-color-hover);
}

.menu-demo {
  margin-top: 16px;
}

.page-demo {
  margin-bottom: 20px;
}

.mini-grid {
  margin-bottom: 16px;
}

.grid-tile {
  min-height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--al-text-color-secondary);
  background: var(--al-bg-color-input);
  border: 1px solid var(--al-border-color-light);
  border-radius: 6px;
}

.center-demo {
  min-height: 88px;
  border: 1px dashed var(--al-border-color);
  border-radius: 6px;
}

.container-demo {
  overflow: hidden;
  border: 1px solid var(--al-border-color-light);
  border-radius: 6px;
}

.container-band,
.container-side,
.container-main {
  padding: 12px 16px;
  color: var(--al-text-color-secondary);
  background: var(--al-bg-color-input);
  border-bottom: 1px solid var(--al-border-color-light);
}

.container-side {
  width: 160px;
  border-right: 1px solid var(--al-border-color-light);
  border-bottom: 0;
}

.container-main {
  min-height: 120px;
  background: var(--al-bg-color-overlay);
}

.image-demo {
  width: min(100%, 320px);
  height: 214px;
  overflow: hidden;
  border-radius: 6px;
}

.media-row {
  align-items: start;
}

.media-card,
.carousel-card {
  display: grid;
  gap: 10px;
  width: min(100%, 360px);
}

.carousel-card {
  width: min(100%, 720px);
}

.carousel-slide {
  display: grid;
  align-content: end;
  gap: 6px;
  height: 180px;
  padding: 20px;
  color: var(--al-text-color-primary);
  border: 1px solid var(--al-border-color-light);
  border-radius: 6px;
}

.loading-demo {
  min-height: 220px;
}

.token-list {
  display: grid;
  gap: 14px;
  margin-top: 20px;
}

.token-list span {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--al-text-color-regular);
}

.token-list span::before {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--swatch);
  content: '';
}

.inspector-note {
  margin-top: 24px;
}

@media (max-width: 1200px) {
  .workbench {
    grid-template-columns: 220px minmax(0, 1fr);
  }

  .inspector {
    display: none;
  }
}

@media (max-width: 960px) {
  .workbench {
    grid-template-columns: 1fr;
  }

  .sidebar,
  .inspector {
    position: static;
    height: auto;
    border: 0;
  }

  .stage {
    padding: 24px;
  }

  .stage-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .form-grid,
  .choice-grid,
  .upload-row,
  .data-grid,
  .nav-demo-grid {
    grid-template-columns: 1fr;
  }
}
</style>
