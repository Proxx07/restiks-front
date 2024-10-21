<script setup lang="ts">
import { catalog } from 'assets/images';
import type { IFolder } from '~/composables/useMenu/types';
import { sidebarPages } from '~/composables/useNavigation/models';
import type { ActionTypes, Navigation } from '~/composables/useNavigation/types';

const props = defineProps<{
  folders: IFolder[]
  currentFolderId: string
  isSidebarPages: boolean
}>();

const emit = defineEmits<{
  (e: 'action', value: ActionTypes): void
}>();

const $router = useRouter();
const localePath = useLocalePath();

const isFolders = computed<boolean>(() => !props.isSidebarPages);
const pages = computed<Navigation[]>(() => sidebarPages);
const sideBarTitle = computed<string>(() => isFolders.value ? 'folders' : 'my-profile');

const hoverPageName = ref<string>('');
const sidebarPageClickHandler = (value: Navigation) => {
  if (value.action) return emit('action', value.action);

  if (value.link) $router.push(localePath(value.link));
};
</script>

<template>
  <aside class="aside">
    <div class="sticky-content">
      <h3>
        <UIIcon :icon="catalog" />
        {{ $t(sideBarTitle) }}
      </h3>
      <nav class="page shadow padding">
        <ul v-if="isFolders">
          <li v-for="folder in folders" :key="folder.id">
            <NuxtLink :to="{ path: localePath('/'), query: { folder: folder.id } }">
              <Button text plain fluid :raised="currentFolderId === folder.id">
                <div class="button-inner">
                  <UIImage :size="50" :src="folder.imageUrl" />
                  <transition name="slideY">
                    <span :key="folder.name" class="page-name">
                      {{ folder.name }}
                    </span>
                  </transition>
                </div>
              </Button>
            </NuxtLink>
          </li>
        </ul>
        <ul v-else>
          <li v-for="page in pages" :key="page.name" :class="[page.action && 'margin-top-auto']">
            <Button
              text fluid plain
              :raised="!!page.link && $router.currentRoute.value.path === localePath(page.link)"
              @click="sidebarPageClickHandler(page)"
              @mouseover="hoverPageName = page.name"
              @mouseleave="hoverPageName = ''"
            >
              <div class="button-inner">
                <UIIcon
                  v-if="page.icon"
                  :icon="page.icon"
                  class="icon"
                  :color="hoverPageName === page.name || (page.link && $router.currentRoute.value.path === localePath(page.link)) ? 'var(--primary-500)' : ''"
                />
                <transition name="slideY">
                  <span :key="$t(`menu.${page.name}`)" class="page-name">
                    {{ $t(`menu.${page.name}`) }}
                  </span>
                </transition>
              </div>
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.aside {
  position: relative;
  nav {
    border-radius: 0 0 var(--radius-l) var(--radius-l);
    max-height: calc(100dvh - 8.5rem);
    overflow-y: auto;
  }
  .sticky-content {
    top: .5rem;
    position: sticky;
  }
}

ul li {
  margin-bottom: .5rem;
  :deep(.p-button) {
    justify-content: flex-start;
    text-align: left;
  }

  .button-inner {
    display: flex;
    align-items: center;
    gap: .5rem;
    width: 100%;
    .page-name {
      width: 100%;
      position: static;
      left: 6rem;
      & + .page-name {
        position: absolute;
      }
    }
    :deep(.image), .icon {
      min-width: 5rem;
    }

    .icon {
      :deep(svg) {
        height: 3rem;
      }
    }
  }
}
</style>
