/**
 * Audit Logging Helper
 * Tracks admin operations for compliance and security
 */

import { prisma } from './db';

interface AuditLogParams {
  adminId: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  entity: 'User' | 'Project' | 'Investment';
  entityId: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
}

export async function createAuditLog({
  adminId,
  action,
  entity,
  entityId,
  metadata,
  ipAddress,
}: AuditLogParams) {
  try {
    return await prisma.adminAuditLog.create({
      data: {
        adminId,
        action,
        entity,
        entityId,
        metadata: metadata || {},
        ipAddress,
      },
    });
  } catch (error) {
    console.error('Error creating audit log:', error);
    // Don't throw - logging shouldn't break the main operation
  }
}
