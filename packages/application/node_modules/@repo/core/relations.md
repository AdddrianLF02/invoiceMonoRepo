## RELACIÓN ENTIDADES

1. **USER** 1:1 **CUSTOMER** -> La relación es de uno a uno (o uno a cero/uno) porque cada **USER** del sistema (quien inicia sesión) tiene un solo perfil de facturación activo (**CUSTOMER**) que gestiona sus datos empresariales.

2. **CUSTOMER** 1:N **INVOICE** -> Cada **CUSTOMER** puede tener múltiples **INVOICE**s, lo que hace de **INVOICE** un Agregado Raíz directamente propiedad de **CUSTOMER**.

3. **INVOICE** 1:N **INVOICE_ITEM** -> Esta es una relación de `Composición` (el rombo sólido en notación ER). La vida de un **INVOICE_ITEM** está totalmente controlada y depende de su **INVOICE** padre. Esto nos asegura que las reglas del Dominio (como la inmutabilidad) solo se chequeen a nivel de la Raíz (`Invoice.addItem()`).