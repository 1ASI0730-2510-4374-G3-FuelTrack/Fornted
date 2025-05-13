// src/domains/client/orders/models/order.js

/**
 * @typedef {Object} ProductItem
 * @property {string} product - Nombre del producto (ej. "Diesel B5")
 * @property {number} quantity - Cantidad del producto
 * @property {string} unit - Unidad de medida (ej. "gal")
 * @property {string} price - Precio unitario (ej. "S/ 8.00")
 * @property {string} total - Precio total (ej. "S/ 4000.00")
 */

/**
 * @typedef {Object} Order
 * @property {number} id - ID único de la orden
 * @property {string} created - Fecha de creación (ej. "2025-05-12")
 * @property {string} user - Nombre del usuario solicitante
 * @property {string} terminal - Terminal de despacho
 * @property {string} amount - Monto total (ej. "S/ 5000.00")
 * @property {string} orderId - ID de orden generado (ej. "d_abcd1234")
 * @property {'Requested'|'Approved'|'Released'|'Closed'} status - Estado de la orden
 * @property {ProductItem[]} products - Lista de productos detallados
 */
