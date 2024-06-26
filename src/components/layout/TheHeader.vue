<template>
  <header
    class="w-full h-20 bg-white flex justify-center items-center fixed top-0 start-0 z-40 border-b border-gray-200 select-none"
  >
    <nav class="w-11/12 m-auto flex justify-between items-center">
      <h1 class="flex justify-center items-center">
        <router-link to="/">
          <svg-icon name="logo" width="150" height="60"></svg-icon>
        </router-link>
      </h1>
      <ul>
        <li>
          <router-link to="/feed">News Feed</router-link>
        </li>
        <li>
          <router-link to="/myposts">My Posts</router-link>
        </li>
      </ul>
      <base-dropdown></base-dropdown>
    </nav>
  </header>
</template>

<style scoped lang="postcss">
header a {
  @apply border-b border-solid border-transparent px-6 font-medium py-3 transition;
}

h1 a {
  @apply p-0;
}

a:active,
a:hover,
a.router-link-active {
  @apply text-blue-600 transition;
}

h1 a:active,
h1 a:hover,
h1 a.router-link-active {
  @apply border-transparent;
}

ul {
  @apply flex justify-center items-center absolute left-1/2 -translate-x-1/2;
}

li {
  @apply mx-2;
}
</style>
