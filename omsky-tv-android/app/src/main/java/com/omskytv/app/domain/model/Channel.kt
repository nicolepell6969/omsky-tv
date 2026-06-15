package com.omskytv.app.domain.model

data class Channel(
    val id: String,
    val name: String,
    val altNames: List<String>,
    val network: String?,
    val owners: List<String>,
    val country: String,
    val categories: List<String>,
    val isNsfw: Boolean,
    val launched: String?,
    val closed: String?,
    val replacedBy: String?,
    val website: String?,
    val logo: String?
)

data class Stream(
    val channel: String,
    val url: String,
    val httpReferrer: String?,
    val userAgent: String?,
    val timeshift: String?
)
