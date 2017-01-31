<img src="https://cloud.githubusercontent.com/assets/478864/22186847/68223ce6-e0b1-11e6-8a62-0e3edc96725e.png" width=30> Add TCP to your server
===

##Description:
This assignment will have you create a TCP Server for serving data requests from your very simple database.

**You are strongly encouraged to pair on this assignment**

## Testing
You should use TCP clients to TDD the implementation. Note that these are E2E tests and you can likely use
basic E2E before/after from previous E2E.

This is a simplified network server that will expect a client to connect, then parse messages
as instructions.

Request message format:

```
{
  method: <name of method: save|update|remove|get|getAll>,
  table: <name of data table>,
  data: <data for this operation>
}
```

Response message format:

```
{
  [error: <error that happened>],
  data: <response from database>
}
```

* Encode for `utf8` when possible
* Use `JSON.parse` and `JSON.stringify` to send/receive messages


Standard repository/dev stuff: README, package.json, travis-ci, tests, meaningful commits, named npm scripts, etc.

##Rubric:

* Tests: 4pts
* Correct TCP Behavior: 3pts
* TCP Server Organization/Style: 2pts
