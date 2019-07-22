<template>
  <b-navbar toggleable="sm" type="light" variant="light">
    <b-navbar-brand>
      <router-link :to="leftLink">{{left}}</router-link>
    </b-navbar-brand>
    <b-navbar-brand class="topnav-centered">{{title}}</b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-navbar-brand class="text-danger" right>
        <router-link :to="rightLink" class="text-danger">{{right}}</router-link>
      </b-navbar-brand>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
    props:{
        title: String,
        left: String,
        right: String,
        linkLeft: String,
        linkRight: String
    }
}
</script>
