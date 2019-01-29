---
title: "VendurePlugin"
weight: 10
generated: true
---
<!-- This file was generated from the Vendure TypeScript source. Do not modify. Instead, re-run "generate-docs" -->


# VendurePlugin

A VendurePlugin is a means of configuring and/or extending the functionality of the Vendure server. In its simplest form,

### configure

{{< member-info type="(config: Required&#60;<a href='/docs/api///vendure-config/'>VendureConfig</a>&#62;) => Required&#60;<a href='/docs/api///vendure-config/'>VendureConfig</a>&#62; | Promise&#60;Required&#60;VendureConfig&#62;&#62;" >}}

This method is called before the app bootstraps, and can modify the VendureConfig object and perform

### onBootstrap

{{< member-info type="(inject: InjectorFn) => void | Promise&#60;void&#62;" >}}

This method is called after the app has bootstrapped. In this method, instances of services may be injected

### defineGraphQlTypes

{{< member-info type="() => DocumentNode" >}}

The plugin may extend the default Vendure GraphQL schema by implementing this method.

### defineProviders

{{< member-info type="() => Array&#60;Type&#60;any&#62;&#62;" >}}

The plugin may define custom providers (including GraphQL resolvers) which can then be injected via the Nest DI container.

### defineEntities

{{< member-info type="() => Array&#60;Type&#60;any&#62;&#62;" >}}

The plugin may define custom database entities, which should be defined as classes annotated as per the
