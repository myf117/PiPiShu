<template>
  <div id="container">
    <div id="sort">
      <span>分类</span>
      <span>|</span>
      <div id="sort-item">
        <span>
          全部
          <span class="sortline">|</span>
        </span>
        <span>
          有声书
          <span class="sortline">|</span>
        </span>
        <span>
          头条
          <span class="sortline">|</span>
        </span>
        <span>
          娱乐
          <span class="sortline">|</span>
        </span>
        <span>
          儿童
          <span class="sortline">|</span>
        </span>
        <span>
          音乐
          <span class="sortline">|</span>
        </span>
        <span>相声评书</span>
      </div>
    </div>
    <div id="ismoney">
      <span>是否付费</span>
      <span>|</span>
      <div id="ismoney-item">
        <span>
          全部
          <span class="sortline">|</span>
        </span>
        <span>
          付费
          <span class="sortline">|</span>
        </span>
        <span>
          免费
          <span class="sortline">|</span>
        </span>
      </div>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#container {
  width: 800px;
  font-size: 14px;
}
#sort,
#ismoney {
  display: flex;
  margin-bottom: 20px;
}
#sort > span,
#ismoney > span {
  margin-right: 10px;
}
#sort-item,#ismoney-item {
  margin-left: 10px;
  cursor: pointer;
}

#sort-item span:hover {
  color: #3cced0;
}
#ismoney-item span:hover {
  color: #3cced0;
}

.sortline {
  margin: 0 10px;
  color: rgb(236, 236, 236);
}

.line {
  height: 2px;
  background-color: rgb(224, 224, 224);
}
</style>