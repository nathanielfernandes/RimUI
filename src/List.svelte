<script lang="ts">
  import { images } from "./stores";
  import Item from "./Item.svelte";
</script>

<ul>
  {#each $images as id}
    <Item {id} />
  {/each}
</ul>

<style>
  ul {
    margin: 0;
    margin-top: 2rem;
    padding: 0;
  }
</style>
