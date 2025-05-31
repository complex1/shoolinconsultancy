/**
 * Utility functions for path-related operations
 */

/**
 * Checks if the given path is an admin path
 * @param path - The path to check
 * @returns true if the path is an admin path, false otherwise
 */
export function isAdminPath(path: string): boolean {
  return path.startsWith('/admin');
}
