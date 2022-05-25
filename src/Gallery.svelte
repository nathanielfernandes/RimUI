<script lang="ts">
  import Gallery from "svelte-image-gallery";
  import { cdn_endpoint, images, modal, editing } from "./stores";

  //class={$editing && $editing === id ? "edit" : ""}
</script>

<Gallery
  gap="5"
  maxColumnWidth="200"
  on:click={(e) => modal.set(e.detail.alt)}
  loading="lazy"
>
  {#each $images as id}
    {#if $editing}
      {#if $editing !== id}
        <img class="dark" src="{$cdn_endpoint}/imgs/{id}?scale=0.5" alt={id} />
      {:else}
        <img class="edit" src="{$cdn_endpoint}/imgs/{id}?scale=0.5" alt={id} />
      {/if}
    {:else}
      <img src="{$cdn_endpoint}/imgs/{id}?scale=0.5" alt={id} />
    {/if}
  {/each}
</Gallery>

<style>
  img {
    background-color: var(--accent-color);
    border-radius: 5px;
    cursor: pointer;
    transition: all 100ms;
    user-select: none;
  }

  img:hover {
    opacity: 0.8;
  }

  img:active {
    opacity: 1;
  }

  .edit {
    z-index: 2;
    transform: scale(1.1);
  }

  .dark {
    opacity: 0.5;
  }
</style>
