
# Getting Started

This template is designed to be installed inside a Codio box. To to this, open the terminal and run the following command:

```shell
$ curl -sL https://bit.ly/3htttku | bash
```

This will configure the box ready for you to start development.

> The process can take up to 15 min. Make sure you don't close the browser tab _or let your computer go into sleep mode_.

To run the server you need to run the following:

```shell
$ deno task run
```

The website database has been added with a root password of `p455w0rd` and a single **accounts** table which is pre-configured with a single account:

username: `doej`

password: `p455w0rd`

There is a secure page called **Foo Bar** which can be accessed at the `/foo` route. You will need to delete this and replace with your own secure content.

## User Acceptance Testing

Before running UATs on your website make sure you go the **Project > Settings** screen and turn off **PROTECT DYNAMIC PORTS**.

You will need to update the `url` variable in each script to point to your own Codio web server.

```shell
$ deno test --allow-all --unstable uat/
```

Remember that you will need to run the tests from your desktop computer and that the web server must be running.

## The Database

This Codio box comes with MySQL installed and ready to use. In addition to the **root** account there is a low-privilege account called **websiteuser** that is used by the API.

- **root** password: `p455w0rd`
- **websiteuser** password: `websitepassword

You will need to log in to the **mysql-client** CLI tool using the **root** account which will allow you to modify the database schema.

## Frequently-Asked Questions

If you get stuck your first step should be to see if this is a problem that others have already encountered. There is a comprehensive FAQ document that gives solutions to the most common problems.

[Frequently-Asked Questions](https://docs.google.com/document/d/1b_lTA_ay0Yi46annuNnZ6fK1nIe_ddszmPua1Wwvfa0/edit?usp=sharing)

You should check this document before asking your module leader for help.

v10.4.0

v6.5.1
