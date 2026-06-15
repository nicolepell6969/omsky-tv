package com.omskytv.app.domain.repository

import com.omskytv.app.domain.model.Channel
import com.omskytv.app.domain.model.Stream
import com.omskytv.app.util.Resource
import kotlinx.coroutines.flow.Flow

interface ChannelRepository {
    suspend fun getChannels(): Flow<Resource<List<Channel>>>
    suspend fun getStreamsByChannel(channelId: String): Flow<Resource<List<Stream>>>
    suspend fun getChannelById(channelId: String): Channel?
}
