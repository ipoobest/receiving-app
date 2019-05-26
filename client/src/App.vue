<template>
    <div class="wrapper">
        <div class="sidebar" data-active-color="blue" data-background-color="black" data-image="../assets/img/sidebar-1.jpg">
            <!--
        Tip 1: You can change the color of active element of the sidebar using: data-active-color="purple | blue | green | orange | red | rose"
        Tip 2: you can also add an image using data-image tag
        Tip 3: you can change the color of the sidebar with data-background-color="white | black"
    -->
            <div class="logo">
                <a href="#" class="simple-text logo-mini">
                    URL
                </a>
                <a href="#" class="simple-text logo-normal">
                    Freeswitch
                </a>
            </div>
            <div class="sidebar-wrapper">
                <ul class="nav">
                    <li>
                        <a v-bind:href="'/'">
                            <i class="material-icons">dashboard</i>
                            <p> urls </p>
                        </a>
                    </li>
                    <li>
                        <a a v-bind:href="'/setting'">
                            <i class="material-icons">image</i>
                            <p> Settings</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
      <div id="app">
        <router-view/>
      </div>
    </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
