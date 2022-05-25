<script>
  export let id;
  import {
    modal,
    delete_image,
    rename_image,
    token,
    endpoint,
    editing,
  } from "./stores";
  import { fade } from "svelte/transition";

  let new_id = id;
  let edit = false;
  let to_delete = false;

  $: if (edit) {
    editing.set(id);
  }

  function edit_mode() {
    if (edit) {
      if (to_delete) {
        delete_image($endpoint, $token, id);
      } else {
        rename_image($endpoint, $token, id, new_id);
      }

      edit = false;
      editing.set("");
      to_delete = false;
    } else {
      edit = true;
    }
  }
</script>

<li class={(edit ? "edit" : "") + " " + (to_delete ? "delete" : "")}>
  <span>
    <i class="fa-solid fa-image" />
    {#if edit}
      <input
        in:fade={{ duration: 100 }}
        bind:value={new_id}
        disabled={to_delete}
      />
    {:else}
      <span in:fade={{ duration: 100 }}>{id}</span>
    {/if}
  </span>
  <span>
    <button
      class={to_delete ? "btn-disabled" : ""}
      disabled={!edit}
      on:click={() => {
        to_delete = !to_delete;
      }}
    >
      <i class="fa-solid fa-trash" />
    </button>
    <button
      class={edit ? "btn-disabled" : ""}
      on:click={edit_mode}
      disabled={$editing && $editing != id}
    >
      <i class="fa-solid fa-pencil" />
    </button>
  </span>
</li>

<style>
  li {
    background-color: var(--accent-color);
    color: var(--text-color);
    list-style-type: none;
    margin: 3px 0;
    height: 1.8rem;
    border-radius: 5px;
    padding: 0.1rem 0.5rem;
    text-align: left;
    align-items: center;
    display: flex;
    cursor: pointer;
    transition: all 100ms;
    justify-content: space-between;
  }

  li:hover {
    background-color: var(--accent-color-hover);
    /* transform: scale(1.05); */
  }

  li:active {
    background-color: var(--accent-color-active);
    /* transform: scale(0.98); */
  }

  button {
    width: 2.5rem;
    height: 1.6rem;
    margin: 0;
    padding: 0;
  }

  .edit {
    background-color: var(--special-color);
  }
  .edit:hover {
    background-color: var(--special-color-hover);
  }
  .edit:active {
    background-color: var(--special-color-active);
  }

  .delete,
  .delete:hover,
  .delete:active {
    background-color: var(--red);
  }

  input {
    height: 1.5rem;
    margin: 0;
  }

  .fa-image {
    margin-right: 0.7rem;
  }
</style>
