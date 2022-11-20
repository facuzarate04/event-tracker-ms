

# Microservicio de Eventos

## Casos de uso

### CU: Crear evento
**Descripción CU:**
- Este CU se utiliza, mediante interface REST, para crear una nueva entrada de Event en la base de datos

**Flujo normal:**
- Los campos `name` y `properties` no pueden ir vacios o no definidos
- El campo `properties` debe ser un object
- Se recomienda que el campo `properties` tenga un atributo llamado `distinct_id` utilizado con algún valor distintivo del evento a trackear
- Se guarda el event con el `name` y las `properties` ingresadas en el body

**Interfaz REST**
- `POST: v1/event`
*Headers*
- Authorization: Bearer token
*Response*
- `200 OK` si se crea el Event


### CU: Obtener eventos
**Descripción CU:**
- Este CU se utiliza, mediante interface REST, para obtener una lista de eventos filtrando por los campos requeridos

**Flujo normal:**
- El campo `name` no puede ser vacio o indefinido en los query params
- Se buscan events guardados que coincidan con los criterios de busqueda ingresados en los query params
- Se devuelve una collection que puede ser vacía o no, de acuerdo a la cantidad de events que devuelva la busqueda anterior

**Interfaz REST**
- `GET: v1/events?name={name}`
*Headers*
- Authorization: Bearer token
*Response*
- `200 OK` Independientemente de la longitud de la lista obtenida

```json
{
	[
		{
		    "name": "profile-link",
		    "properties": {
		      "distinct_id": "kurja@mail.com",
		      "origin_device": "Iphone 14 Pro Max",
		      "origin_agent": "Safari 15.2"
		    },
		    "createdAt": "2022-11-20T18:48:49.788Z",
		    "updatedAt": "2022-11-20T18:48:49.788Z"
		  },
		  {
		    "name": "profile-link",
		    "properties": {
		      "distinct_id": "kurja@mail.com",
		      "origin_device": "Iphone 14 Pro Max",
		      "origin_agent": "Safari 15.2"
		    },
		    "createdAt": "2022-11-20T18:48:49.788Z",
		    "updatedAt": "2022-11-20T18:48:49.788Z"
		  },
	]
}
```
