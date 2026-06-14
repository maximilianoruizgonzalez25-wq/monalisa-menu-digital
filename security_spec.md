# Micro Security Specification: Monalisa Menu Digital

Authentic Firestore security rules validation specification for the Monalisa Menu. This app consists of a public menu viewer with no custom sign-in required, since orders are dispatched to WhatsApp.

## 1. Data Invariants
*   **Plate Collection**:
    *   Document ID must be a valid alphanumeric string.
    *   Essential fields `name`, `price`, and `category` are required.
    *   Only creation of new, correctly schemas-validated dishes is permitted to support initial automated seeding.
    *   Existing dishes are write-protected and cannot be modified or deleted.

## 2. The "Dirty Dozen" Payloads (Denial Vectors)
The following payloads must be strictly rejected by firestore rules:

1.  **Missing Name**:
    ```json
    { "price": 10.0, "category": "Principales" }
    ```
2.  **Missing Price**:
    ```json
    { "name": "Lomito", "category": "Principales" }
    ```
3.  **Missing Category**:
    ```json
    { "name": "Lomito", "price": 12.0 }
    ```
4.  **Negative Price**:
    ```json
    { "name": "Lomito", "price": -5.0, "category": "Principales" }
    ```
5.  **Exorbitant Price**:
    ```json
    { "name": "Lomito Gold", "price": 99999.0, "category": "Principales" }
    ```
6.  **Oversized Name String**:
    ```json
    { "name": "A...[1000 chars]...", "price": 12.0, "category": "Principales" }
    ```
7.  **Extra Shadow field injection**:
    ```json
    { "name": "Lomito", "price": 12.0, "category": "Principales", "hackerSuperuser": true }
    ```
8.  **Invalid Type (Name as number)**:
    ```json
    { "name": 1234, "price": 12.0, "category": "Principales" }
    ```
9.  **Invalid Type (Price as string)**:
    ```json
    { "name": "Lomito", "price": "12 USD", "category": "Principales" }
    ```
10. **Malicious ID (Poison path)**:
    ```
    Attempting to write to doc URL-encoded invalid id.
    ```
11. **Anonymously modifying high-value existing plate**:
    ```json
    Trying to update existing plate price to $0.01.
    ```
12. **Malicious Delete**:
    ```
    Trying to wipe out plates remotely.
    ```

## 3. Test Runner Framework Verification
The security rules compiled below will guarantee that all above security violations result in `PERMISSION_DENIED` errors.
