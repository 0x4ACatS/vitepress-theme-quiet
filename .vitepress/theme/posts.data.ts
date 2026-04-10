import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/*.md', {
  excerpt: true,
  transform(raw) {
    return raw.map(page => ({
      url: page.url,
      frontmatter: page.frontmatter,
      excerpt: page.excerpt,
    }))
  },
})

export declare const data: Array<{
  url: string
  frontmatter: Record<string, any>
  excerpt?: string
}>
